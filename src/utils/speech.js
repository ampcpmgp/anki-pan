const utterance = new SpeechSynthesisUtterance()

function getVoice(voices, name) {
  return voices.find(voice => name === voice.name)
}

function setVoice() {
  const voices = speechSynthesis.getVoices()

  utterance.voice =
    getVoice(voices, 'Google 日本語') ||
    getVoice(voices, 'Microsoft Haruka Desktop - Japanese')
}

function init() {
  utterance.pitch = 1
  utterance.lang = 'ja-JP'
  utterance.rate = 1.0

  // for google chrome
  window.speechSynthesis.onvoiceschanged = function() {
    setVoice()
  }

  setVoice()
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
