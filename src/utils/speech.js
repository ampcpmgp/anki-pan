import { default as Lang } from '../../const/lang'

const utterance = new SpeechSynthesisUtterance()
export const langs = []

function getVoiceByName(name) {
  const voices = speechSynthesis.getVoices()
  return voices.find(voice => name === voice.name)
}

function getVoiceByLang(lang) {
  const voices = speechSynthesis.getVoices()
  return voices.find(voice => lang === voice.lang)
}

export function setUsableLangs() {
  if (langs.length > 0) return

  const voices = speechSynthesis.getVoices()
  const duplicatedLangs = voices.map(voice => voice.lang)
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
