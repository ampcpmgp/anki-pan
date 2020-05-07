import { default as Lang } from '../../const/lang'

const utterance = new SpeechSynthesisUtterance()
export const langs = []
const voices = [] // { formalLang, value: voice }

function getVoiceByName(name) {
  const voice = voices.find(voice => name === voice.value.name)
  return voice && voice.value
}

function getVoiceByLang(lang) {
  const voice = voices.find(voice => lang === voice.formalLang)
  return voice && voice.value
}

export function setUsableLangs() {
  if (langs.length > 0) return

  // Android chrome@81.0 では、言語と国の区切り文字を '_' としている。
  // RFC 4646 によると `-` が正しい模様。
  // 参考 - https://www.asahi-net.or.jp/~ax2s-kmtn/ref/iso639.html
  // そのため、ハイフンに置き換えて利用する。
  speechSynthesis.getVoices().forEach(voice => {
    const formalLang = voice.lang.replace(/_/g, '-')
    voices.push({
      formalLang,
      value: voice,
    })
  })

  const duplicatedLangs = voices.map(voice => voice.formalLang)
  langs.push(...new Set(duplicatedLangs))
}

function getVoice(lang) {
  switch (lang) {
    case Lang.JA_JP:
      return (
        getVoiceByName('Google 日本語') ||
        getVoiceByName('Microsoft Haruka Desktop - Japanese') ||
        getVoiceByLang(lang)
      )
    default:
      return getVoiceByLang(lang)
  }
}

function init() {
  utterance.pitch = 1
  utterance.rate = 1.0

  // for google chrome
  speechSynthesis.onvoiceschanged = function() {
    setUsableLangs()
  }

  setUsableLangs()
}

export function speak(text, lang) {
  utterance.text = text
  utterance.lang = lang

  const voice = getVoice(lang)
  utterance.voice = voice || getVoiceByLang(langs[0])

  speechSynthesis.speak(utterance)

  return new Promise(resolve => {
    utterance.onend = event => {
      resolve(event)
    }
  })
}

export function cancel() {
  speechSynthesis.cancel()
}

init()
