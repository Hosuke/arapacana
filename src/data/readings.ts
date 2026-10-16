/**
 * 字音三读：梵音（以印地语神经语音读天城体代之）、汉音（读《华严经》汉字注音）、
 * 日本悉昙读音（东密所传之假名读法）。音档于建站前以 scripts/tts.mjs 预先合成，
 * 站上只放静态 mp3，不调用语音接口。
 *
 * 日本悉昙读音：单字依悉昙字母常读（ca→しゃ、pa→は、va→ば、ka→きゃ 等）。
 * 合字之读，各家传承有出入，标 pending，暂不合成，候具传承者覆核后再补。
 */

export interface JaReading {
  kana: string
  /** 合字等读法未定者：不合成音档，界面不出「日」钮 */
  pending?: boolean
}

/** 以 IAST 为键 */
export const jaReadings: Record<string, JaReading> = {
  a: { kana: 'あ' },
  ra: { kana: 'ら' },
  pa: { kana: 'は' },
  ca: { kana: 'しゃ' },
  na: { kana: 'な' },
  la: { kana: 'ら' },
  da: { kana: 'だ' },
  ba: { kana: 'ば' },
  'ḍa': { kana: 'だ' },
  'ṣa': { kana: 'しゃ' },
  va: { kana: 'ば' },
  ta: { kana: 'た' },
  ya: { kana: 'や' },
  'ṣṭa': { kana: 'しゅた', pending: true },
  ka: { kana: 'きゃ' },
  sa: { kana: 'さ' },
  ma: { kana: 'ま' },
  ga: { kana: 'ぎゃ' },
  tha: { kana: 'た' },
  ja: { kana: 'じゃ' },
  sva: { kana: 'そば', pending: true },
  dha: { kana: 'だ' },
  'śa': { kana: 'しゃ' },
  kha: { kana: 'きゃ' },
  'kṣa': { kana: 'きしゃ', pending: true },
  sta: { kana: 'そた', pending: true },
  'ña': { kana: 'じゃ' },
  rtha: { kana: 'らた', pending: true },
  bha: { kana: 'ば' },
  cha: { kana: 'しゃ' },
  sma: { kana: 'そま', pending: true },
  hva: { kana: 'かば', pending: true },
  tsa: { kana: 'さ', pending: true },
  gha: { kana: 'ぎゃ' },
  'ṭha': { kana: 'た' },
  'ṇa': { kana: 'だ' },
  pha: { kana: 'は' },
  ska: { kana: 'そきゃ', pending: true },
  ysa: { kana: 'やさ', pending: true },
  'śca': { kana: 'しゃしゃ', pending: true },
  'ṭa': { kana: 'た' },
  'ḍha': { kana: 'だ' },
  // 诸尊种子字：东密通行之读
  'vaṃ': { kana: 'ばん' },
  'hrīḥ': { kana: 'きりく' },
  'oṃ': { kana: 'おん' },
  'hūṃ': { kana: 'うん' },
}

export type VoiceKind = 'sa' | 'zh' | 'ja'

/** 音档之名：IAST 转 ASCII（不分大小写之文件系统亦不撞名），如 ṭa→tta、śa→sha、hūṃ→huum */
const SLUG: Record<string, string> = { 'ā': 'aa', 'ī': 'ii', 'ū': 'uu', 'ṭ': 'tt', 'ḍ': 'dd', 'ṇ': 'nn', 'ṣ': 'ss', 'ś': 'sh', 'ñ': 'ny', 'ṃ': 'm', 'ḥ': 'h' }

export function audioSlug(iast: string): string {
  return [...iast.normalize('NFC')].map(c => SLUG[c] ?? c).join('')
}

export function audioUrl(kind: VoiceKind, iast: string): string {
  return `${import.meta.env.BASE_URL}audio/${kind}/${audioSlug(iast)}.mp3`
}

export function hasJa(iast: string): boolean {
  const r = jaReadings[iast]
  return !!r && !r.pending
}
