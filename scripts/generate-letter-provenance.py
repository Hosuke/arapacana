#!/usr/bin/env python3
"""Generate per-letter CBETA provenance for the 42-letter gate dataset.

Usage:
  uv run --with opencc-python-reimplemented \
    python scripts/generate-letter-provenance.py \
    --t10 /path/to/T10n0279.xml --t19 /path/to/T19n1019.xml

The script never downloads or executes network content. It reads local CBETA XML,
checks src/data/letters42.ts, and rewrites the generated JSON manifest.
"""
from __future__ import annotations

import argparse
import html
import json
import re
import unicodedata
from pathlib import Path
from xml.etree import ElementTree as ET

try:
    from opencc import OpenCC
except ImportError as exc:  # pragma: no cover - operator guidance
    raise SystemExit('missing OpenCC: run with `uv run --with opencc-python-reimplemented ...`') from exc

NS = {'tei': 'http://www.tei-c.org/ns/1.0', 'cb': 'http://www.cbeta.org/ns/1.0'}
XML_NS = 'http://www.w3.org/XML/1998/namespace'
XML_ID = f'{{{XML_NS}}}id'
VIRAMA = chr(0x115BF)
SOURCE_URLS = {
    'T10n0279': 'https://github.com/cbeta-org/xml-p5/blob/master/T/T10/T10n0279.xml#L37859-L37913',
    'T19n1019': 'https://github.com/cbeta-org/xml-p5/blob/master/T/T19/T19n1019.xml#L774-L872',
}


def compact_text(elem: ET.Element | None) -> str:
    if elem is None:
        return ''
    return re.sub(r'\s+', '', ''.join(elem.itertext()))


def without_pua(text: str) -> str:
    return ''.join(ch for ch in text if ord(ch) < 0x10000)


def parse_siddham(expr: str) -> str:
    raw = expr.strip().strip('`\'"').replace('${V}', VIRAMA)
    return re.sub(r'\\u\{([0-9A-Fa-f]+)\}', lambda m: chr(int(m.group(1), 16)), raw)


def parse_site_rows(path: Path) -> list[dict]:
    rows=[]
    for line in path.read_text(encoding='utf-8').splitlines():
        if '{ n:' not in line:
            continue
        def field(pattern: str) -> str:
            m=re.search(pattern,line)
            if not m:
                raise ValueError(f'cannot parse {pattern!r} in {line}')
            return m.group(1)
        siddham=parse_siddham(field(r'siddham: (.*?), han:'))
        rows.append({
            'n':int(field(r'n: (\d+)')),
            'siddham':siddham,
            'han':field(r"han: '(.*?)'"),
            'iast':field(r"iast: '(.*?)'"),
            'form':field(r"form: '(.*?)'"),
            'gate':field(r"gate: '(.*?)'"),
            'meaning':field(r"meaning: '(.*?)'"),
        })
    if len(rows)!=42 or [x['n'] for x in rows]!=list(range(1,43)):
        raise ValueError(f'letters42.ts must contain ordered 1..42, got {len(rows)} rows')
    return rows


def parse_t19(path: Path) -> list[dict]:
    root=ET.parse(path).getroot()
    roman={}
    for char in root.findall('.//tei:char',NS):
        cid=char.get(XML_ID)
        for prop in char.findall('tei:charProp',NS):
            if compact_text(prop.find('tei:localName',NS))=='RomanizedforminUnicodetranscription':
                roman[cid]=compact_text(prop.find('tei:value',NS))

    raw_lines=path.read_text(encoding='utf-8').splitlines()
    loc_by_pid={}
    for i,line in enumerate(raw_lines):
        if '<p xml:id="pT19p' not in line or 'sa-Sidd' not in line:
            continue
        block=line; j=i
        while '</p>' not in block and j+1<len(raw_lines):
            j+=1; block+=raw_lines[j]
        pid=re.search(r'<p xml:id="([^"]+)"',block).group(1)
        lbs=re.findall(r'<lb n="([^"]+)"',block)
        start=lbs[0] if lbs else re.search(r'pT19p(\d{4}[abc]\d{2})',pid).group(1)
        loc_by_pid[pid]=(start,lbs[-1] if lbs else start)

    out=[]
    lang_attr=f'{{{XML_NS}}}lang'
    for p in root.findall('.//tei:body//tei:p',NS):
        sidd=next((x for x in p.findall('.//cb:t',NS) if x.get(lang_attr)=='sa-Sidd'),None)
        g=sidd.find('.//tei:g',NS) if sidd is not None else None
        if g is None or not g.get('ref'):
            continue
        ref=g.get('ref').lstrip('#')
        text=without_pua(compact_text(p))
        meaning=re.search(r'悟(一切法.+?)故。?$',text)
        if ref not in roman or not meaning:
            continue
        zh=next((x for x in p.findall('.//cb:t',NS) if x.get(lang_attr)=='zh-Hant'),None)
        zi=zh.find('.//cb:zi',NS) if zh is not None else None
        han_source=without_pua(compact_text(zi if zi is not None else zh)).lstrip('　')
        start,end=loc_by_pid[p.get(XML_ID)]
        out.append({
            'n':len(out)+1,
            'cbetaCharacterId':ref,
            'iast':roman[ref],
            'hanSourceZhHant':han_source,
            'meaningZhHant':meaning.group(1),
            'quoteZhHant':text.lstrip('「'),
            'loc':f'p.{start}' if start==end else f'p.{start}–{end}',
        })
    if len(out)!=42:
        raise ValueError(f'T19 must yield 42 rows, got {len(out)}')
    return out


def clean_xml_line(line: str) -> str:
    line=re.sub(r'<note\b.*?</note>','',line,flags=re.S)
    line=re.sub(r'<anchor\b[^>]*/>','',line)
    return re.sub(r'\s+','',html.unescape(re.sub(r'<[^>]+>','',line)))


def to_hans(cc: OpenCC, text: str) -> str:
    # OpenCC intentionally preserves a few historical forms; normalize the one
    # that appears in this passage so the public Simplified-Chinese UI is clean.
    return cc.convert(text).replace('諠', '喧')


def t10_gate_loc(path: Path, gate_zh_hans: str, cc: OpenCC) -> str:
    chars=[]
    locs=[]
    for raw in path.read_text(encoding='utf-8').splitlines():
        m=re.search(r'<lb n="([^"]+)"',raw)
        if m:
            normalized=re.sub(r'[：；，。、“”「」\s]','',to_hans(cc,clean_xml_line(raw)))
            chars.extend(normalized)
            locs.extend([m.group(1)]*len(normalized))
    needle=re.sub(r'[：；，。、“”「」\s]','',gate_zh_hans)
    pos=''.join(chars).find(needle)
    if pos<0:
        raise ValueError(f'gate not found in T10: {gate_zh_hans}')
    start,end=locs[pos],locs[pos+len(needle)-1]
    return f'p.{start}' if start==end else f'p.{start}–{end}'


def main() -> None:
    ap=argparse.ArgumentParser()
    ap.add_argument('--repo-root',type=Path,default=Path(__file__).resolve().parents[1])
    ap.add_argument('--t10',type=Path,required=True)
    ap.add_argument('--t19',type=Path,required=True)
    args=ap.parse_args()
    cc=OpenCC('t2s')
    site=parse_site_rows(args.repo_root/'src/data/letters42.ts')
    t19=parse_t19(args.t19)
    letters=[]
    for row,src in zip(site,t19,strict=True):
        if row['iast']!=src['iast']:
            raise ValueError(f"#{row['n']} IAST mismatch: site={row['iast']} T19={src['iast']}")
        meaning=to_hans(cc,src['meaningZhHant'])
        if row['meaning']!=meaning:
            raise ValueError(f"#{row['n']} meaning mismatch: site={row['meaning']} T19={meaning}")
        form='合字' if VIRAMA in row['siddham'] else '单字'
        if row['form']!=form:
            raise ValueError(f"#{row['n']} form mismatch: site={row['form']} codepoints={form}")
        han_t19=to_hans(cc,src['hanSourceZhHant'])
        variants=[]
        if row['han']!=han_t19:
            variants.append(f"《八十华严》译音作“{row['han']}”，不空本作“{han_t19}”；本站汉字栏随T10，悉昙与IAST随T19。")
        if row['n']==37:
            variants.append('第37字为显著异本：T10作“娑颇”，不空T19本作“颇”(pha)；本站字形采用不空本。')
        if row['n']==42:
            variants.append('末字异文较多：T10作“陀”，T19不空本作“荼”(ḍha)，其明本异文作“茶”；本站字形采用不空本。')
        letters.append({
            'n':row['n'],
            'site':{'han':row['han'],'iast':row['iast'],'gate':row['gate'],'meaning':row['meaning'],'form':row['form']},
            'gateEvidence':{
                'sourceId':'T10n0279','loc':t10_gate_loc(args.t10,row['gate'],cc),
                'normalizedExcerptZhHans':f"唱{row['han']}字时，入般若波罗蜜门，名：{row['gate']}",
            },
            'interpretationEvidence':{
                'sourceId':'T19n1019','loc':src['loc'],'cbetaCharacterId':src['cbetaCharacterId'],
                'hanSourceZhHant':src['hanSourceZhHant'],'iast':src['iast'],
                'meaningZhHant':src['meaningZhHant'],'meaningZhHans':meaning,'quoteZhHant':src['quoteZhHant'],
            },
            'glyphEvidence':{
                'sourceId':'T19n1019','codepoints':[f'U+{ord(ch):05X}' for ch in row['siddham']],
                'unicodeNames':[unicodedata.name(ch,'UNKNOWN') for ch in row['siddham']],
                'form':form,
            },
            'variantNotes':variants,
        })
    manifest={
        'schemaVersion':1,
        'policy':{
            'hanAndGate':'T10 No.279《大方广佛华严经》卷七十六',
            'siddhamIastAndMeaning':'T19 No.1019不空译《大方广佛华严经入法界品四十二字观门》',
            'meaningLabel':'不空本释义；非《八十华严》门名原句',
            'formRule':'悉昙Unicode串含U+115BF VIRAMA者记为合字；不按汉译字数判断',
        },
        'sources':{
            'T10n0279':{'title':'《大方广佛华严经》卷七十六·善知众艺童子','ref':'CBETA T10, no.279, p.418a08–c02','url':SOURCE_URLS['T10n0279']},
            'T19n1019':{'title':'不空译《大方广佛华严经入法界品四十二字观门》','ref':'CBETA T19, no.1019, p.707c21–709a11','url':SOURCE_URLS['T19n1019']},
        },
        'letters':letters,
    }
    out=args.repo_root/'src/data/letters42.provenance.json'
    out.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps({'output':str(out),'letters':len(letters),'variants':sum(bool(x['variantNotes']) for x in letters),'single':sum(x['site']['form']=='单字' for x in letters),'compound':sum(x['site']['form']=='合字' for x in letters)},ensure_ascii=False))

if __name__=='__main__':
    main()
