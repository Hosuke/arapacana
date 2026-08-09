# 四十二字门：引用与校勘说明

本站把经文门名、悉昙字形、罗马转写与后出释义分层保存，避免把不同译本拼成一个“定本”。网页逐字弹窗所示“校勘依据”，由 `src/data/letters42.provenance.json` 提供。

## 底本层级

| 数据 | 直接底本 | 用法 |
|---|---|---|
| 汉字注音、般若波罗蜜门名 | 《大方广佛华严经》卷七十六，CBETA T10, no.279, p.418a08–c02 | `letters42.ts` 的 `han`、`gate` |
| 悉昙字、IAST、逐字“悟一切法……”释义 | 不空译《大方广佛华严经入法界品四十二字观门》，CBETA T19, no.1019, p.707c21–709a11 | `siddham`、`iast`、`meaning` |
| 字轮仪轨背景 | 不空《华严经入法界品字轮瑜伽仪轨》，CBETA T19, no.1020 | 月轮布字与前行边界 |
| 论释复核 | 《大智度论》T25, no.1509；澄观《随疏演义钞》T36, no.1736 | 核义与辨异，不冒充T10原句 |

原文入口：

- [T10 No.279 四十二字门](https://github.com/cbeta-org/xml-p5/blob/master/T/T10/T10n0279.xml#L37859-L37913)
- [T19 No.1019 四十二字观门](https://github.com/cbeta-org/xml-p5/blob/master/T/T19/T19n1019.xml#L774-L884)
- [T19 No.1020 字轮瑜伽仪轨](https://github.com/cbeta-org/xml-p5/blob/master/T/T19/T19n1020.xml#L107-L177)
- [T25 No.1509 大智度论](https://github.com/cbeta-org/xml-p5/blob/master/T/T25/T25n1509.xml#L33163-L33384)
- [T36 No.1736 随疏演义钞](https://github.com/cbeta-org/xml-p5/blob/master/T/T36/T36n1736.xml#L62561-L62899)

## 生成逐字考证资料

CBETA XML不收入本仓库。准备本地文件后运行：

```bash
uv run --with opencc-python-reimplemented \
  python scripts/generate-letter-provenance.py \
  --t10 /path/to/T10n0279.xml \
  --t19 /path/to/T19n1019.xml
```

脚本会：

1. 从T19 No.1019的TEI `charDecl`读取CBETA字符ID与Unicode Romanized form；
2. 提取42段“悟一切法……”原文及大正藏页行；
3. 对照 `letters42.ts`，硬性检查42条IAST、简体释义与悉昙合字标记；
4. 从T10定位每一门名的页行；
5. 记录T10汉字音写与T19不空本音写的差异；
6. 生成网页直接使用的 `src/data/letters42.provenance.json`。

生成器不会联网，也不会执行下载内容。

## 字形口径

“合字”只按本站悉昙Unicode串是否含 `U+115BF SIDDHAM SIGN VIRAMA` 判断，不按汉译字数判断。依T19 No.1019，现为：

- 单字：31
- 二辅音合字：11
- 三辅音合字：0

## 重要异本与裁决

本站汉字栏随T10，悉昙与IAST随T19 No.1019；两者不同者在网页逐字注明。尤其：

| 序 | T10音写 | T19不空本 | 本站悉昙/IAST裁决 |
|---:|---|---|---|
| 19 | 他 | 他 | `tha`，单字；旧数据误作`stha` |
| 21 | 锁 | 娑嚩 | `sva`；旧数据误作`śva` |
| 27 | 壤 | 孃 | `ña`，单字；旧数据误作`jña` |
| 36 | 拏 | 儜 | `ṇa`，悉昙NNA；旧码位曾误作普通NA |
| 37 | 娑颇 | 颇 | 不空本作`pha`单字；T10音写“娑颇”作为异本保留 |
| 42 | 陀 | 荼（明本作茶） | `ḍha`，悉昙DDHA；旧码位曾误作齿音DHA |

种子字表另经Unicode名称复核：`hrīḥ`采用长ī符，`hūṃ`采用长ū符，`vaṃ`采用VA加anusvara。未找到直接轨本支持的“迦＝地藏”“娑＝圣观音”两条尊属关系已撤下。

## 发布前审计

除常规 `npm run lint && npm run build` 外，须再次运行生成器。若正文数据与CBETA manifest不合，生成器会以非零状态退出，不应发布。
