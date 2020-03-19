const utterance = new SpeechSynthesisUtterance()

function init() {
  const voices = speechSynthesis.getVoices()

  utterance.pitch = 1
  utterance.text = '細胞'
  utterance.lang = 'ja-JP'
  utterance.rate = 1.0
  utterance.voice = voices[12] || voices[0]
}

export function speak(text) {
  utterance.text = text
  speechSynthesis.speak(utterance)
}

init()
