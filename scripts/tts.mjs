#!/usr/bin/env node
/**
 * 预合成字音：四十二字门与诸尊种子字，各出梵、汉、日三读之 mp3，置 public/audio/<kind>/<slug>.mp3。
 * 站上只放静态音档，密钥不入前端。已存之档不重合成（--force 乃重做）。
 *
 * 用法：node scripts/tts.mjs [--force] [--only sa|zh|ja]
 * 凭证：~/.config/siwen/azure_speech.env（AZURE_SPEECH_KEY、AZURE_SPEECH_REGION）
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises'
import { homedir } from 'node:os'
import path from 'node:path'
import ts from 'typescript'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const args = process.argv.slice(2)
const FORCE = args.includes('--force')
const ONLY = args.includes('--only') ? args[args.indexOf('--only') + 1] : null

// —— 凭证 ——
const env = Object.fromEntries(
  (await readFile(path.join(homedir(), '.config/siwen/azure_speech.env'), 'utf8'))
    .split('\n').filter(l => l.includes('=')).map(l => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]),
)
const KEY = env.AZURE_SPEECH_KEY
const REGION = env.AZURE_SPEECH_REGION
if (!KEY || !REGION) throw new Error('缺 AZURE_SPEECH_KEY／AZURE_SPEECH_REGION')

// —— 载 TS 数据（去类型而取其值） ——
async function loadTs(rel) {
  const src = await readFile(path.join(ROOT, rel), 'utf8')
  const { outputText } = ts.transpileModule(src.replace(/^import .*$/gm, ''), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  })
  return import('data:text/javascript;base64,' + Buffer.from(outputText.replace(/import\.meta\.env\.BASE_URL/g, "'/'")).toString('base64'))
}
const { letters42 } = await loadTs('src/data/letters42.ts')
const { seedSyllables } = await loadTs('src/data/seeds.ts')
const { jaReadings, audioSlug } = await loadTs('src/data/readings.ts')

// —— IAST → 天城体（唯此站所用之音节：辅音丛＋a/ī/ū，鼻化 ṃ，止声 ḥ） ——
const CONS = {
  kh: 'ख', gh: 'घ', ch: 'छ', jh: 'झ', 'ṭh': 'ठ', 'ḍh': 'ढ', th: 'थ', dh: 'ध', ph: 'फ', bh: 'भ',
  k: 'क', g: 'ग', 'ṅ': 'ङ', c: 'च', j: 'ज', 'ñ': 'ञ', 'ṭ': 'ट', 'ḍ': 'ड', 'ṇ': 'ण', t: 'त', d: 'द', n: 'न',
  p: 'प', b: 'ब', m: 'म', y: 'य', r: 'र', l: 'ल', v: 'व', 'ś': 'श', 'ṣ': 'ष', s: 'स', h: 'ह',
}
const VOWEL_SIGN = { a: '', 'ā': 'ा', i: 'ि', 'ī': 'ी', u: 'ु', 'ū': 'ू', e: 'े', o: 'ो' }
const VOWEL_INIT = { a: 'अ', 'ā': 'आ', i: 'इ', 'ī': 'ई', u: 'उ', 'ū': 'ऊ', e: 'ए', o: 'ओ' }
const VIRAMA = '्'

export function devanagari(iast) {
  let s = iast.normalize('NFC')
  let out = ''
  let pendingCons = false
  while (s) {
    const two = [...s].slice(0, 2).join('')
    const one = [...s][0]
    if (CONS[two] && two.length > 1 && /h$/.test(two)) {
      if (pendingCons) out += VIRAMA
      out += CONS[two]; pendingCons = true; s = s.slice(two.length); continue
    }
    if (CONS[one]) {
      if (pendingCons) out += VIRAMA
      out += CONS[one]; pendingCons = true; s = s.slice(one.length); continue
    }
    if (one in VOWEL_SIGN) {
      out += pendingCons ? VOWEL_SIGN[one] : VOWEL_INIT[one]
      pendingCons = false; s = s.slice(one.length); continue
    }
    if (one === 'ṃ') { out += 'ं'; s = s.slice(one.length); continue }
    if (one === 'ḥ') { out += 'ः'; s = s.slice(one.length); continue }
    throw new Error(`天城体未能转写：${iast}（${one}）`)
  }
  if (pendingCons) out += VIRAMA
  return out
}

// —— 三读之声与文 ——
const VOICES = {
  sa: { lang: 'hi-IN', voice: 'hi-IN-MadhurNeural', text: x => devanagari(x.iast), rate: '-25%' },
  zh: { lang: 'zh-CN', voice: 'zh-CN-YunyeNeural', text: x => x.han, rate: '-20%' },
  ja: { lang: 'ja-JP', voice: 'ja-JP-KeitaNeural', text: x => jaReadings[x.iast]?.kana, rate: '-20%' },
}

const esc = s => s.replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]))

async function synth(kind, text) {
  const v = VOICES[kind]
  const ssml = `<speak version="1.0" xml:lang="${v.lang}"><voice name="${v.voice}"><prosody rate="${v.rate}">${esc(text)}</prosody></voice></speak>`
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(`https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
        'User-Agent': 'arapacana-tts',
      },
      body: ssml,
    }).catch(e => ({ ok: false, status: String(e) }))
    if (res.ok) return Buffer.from(await res.arrayBuffer())
    if (attempt < 2) await new Promise(r => setTimeout(r, 1500 * (attempt + 1)))
    else throw new Error(`合成失败 ${kind}「${text}」：HTTP ${res.status}`)
  }
}

const exists = p => access(p).then(() => true, () => false)

// —— 诸音节：字门在先，种子字之不在字门者附后 ——
const items = []
const seen = new Set()
for (const l of letters42) { items.push({ iast: l.iast, han: l.han }); seen.add(l.iast) }
for (const s of seedSyllables) if (!seen.has(s.iast)) { items.push({ iast: s.iast, han: s.han }); seen.add(s.iast) }

const manifest = {}
let made = 0, kept = 0, skipped = 0
for (const kind of Object.keys(VOICES)) {
  if (ONLY && ONLY !== kind) continue
  const dir = path.join(ROOT, 'public/audio', kind)
  await mkdir(dir, { recursive: true })
  for (const x of items) {
    if (kind === 'ja' && (!jaReadings[x.iast] || jaReadings[x.iast].pending)) { skipped++; continue }
    const text = VOICES[kind].text(x)
    if (!text) { skipped++; continue }
    const file = path.join(dir, `${audioSlug(x.iast)}.mp3`)
    ;(manifest[kind] ??= {})[x.iast] = text
    if (!FORCE && await exists(file)) { kept++; continue }
    await writeFile(file, await synth(kind, text))
    made++
    process.stdout.write(`${kind} ${x.iast}「${text}」\n`)
  }
}
await writeFile(path.join(ROOT, 'public/audio/manifest.json'), JSON.stringify({ voices: Object.fromEntries(Object.entries(VOICES).map(([k, v]) => [k, v.voice])), texts: manifest }, null, 2) + '\n')
console.log(`合成 ${made}，已存 ${kept}，略 ${skipped}`)
