class FakeUtter {
  speak() {}
}

Object.assign(global, {
  SpeechSynthesisUtterance: FakeUtter,
  speechSynthesis: {
    getVoices() {
      return []
    },
  },
})
