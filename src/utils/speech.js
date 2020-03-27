const utterance = new SpeechSynthesisUtterance()

function init() {
  const voices = speechSynthesis.getVoices()

  utterance.pitch = 1
  utterance.lang = 'ja-JP'
  utterance.rate = 1.0
  utterance.voice = voices[12] || voices[0]
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
