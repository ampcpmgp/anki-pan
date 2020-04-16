// tesseract.js@2.1.1 では漢字がうまく読み込めなかったため未使用。
const { createWorker } = require('tesseract.js')

const worker = createWorker()
const initP = init()

async function init() {
  await worker.load()
  await worker.loadLanguage('jpn')
  await worker.initialize('jpn')
}

export async function recognize(image) {
  await initP
  const {
    data: { text },
  } = await worker.recognize(image)
  return text
}
