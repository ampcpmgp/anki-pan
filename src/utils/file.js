export function getImageSize(base64) {
  return new Promise(resolve => {
    const img = new Image()
    img.src = base64

    img.onload = () => {
      const { width, height } = img
      resolve({ width, height })
    }
  })
}

export function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader()

    reader.addEventListener('load', async () => {
      resolve(reader.result)
    })

    reader.readAsDataURL(file)
  })
}
