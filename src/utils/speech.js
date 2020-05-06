const utterance = new SpeechSynthesisUtterance()
export const langs = []

function getVoice(voices, name) {
  return voices.find(voice => name === voice.name)
}

export function setUsableLangs() {
  const voices = speechSynthesis.getVoices()
  const duplicatedLangs = voices.map(voice => voice.lang)
  langs.push(...new Set(duplicatedLangs))
}

function setVoice() {
  const voices = speechSynthesis.getVoices()

  const voice =
    getVoice(voices, 'Google 日本語') ||
    getVoice(voices, 'Microsoft Haruka Desktop - Japanese')

  if (voice) {
    utterance.voice = voice
  }
}

function init() {
  utterance.pitch = 1
  utterance.lang = 'en-US'
  utterance.rate = 1.0

  // for google chrome
  window.speechSynthesis.onvoiceschanged = function() {
    setVoice()
    setUsableLangs()
  }

  setVoice()
  setUsableLangs()
}

export function speak(text) {
  utterance.text = text
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
