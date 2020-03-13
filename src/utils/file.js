import Compresser from 'compressorjs'

/**
 * compress image
 * @param {file} File
 */
export function compressImage(file) {
  return new Promise(resolve => {
    new Compresser(file, {
      quality: 0.6,
      convertSize: 1024 * 1024 * 1, // convertSize 1MB (Default 5MB)

      success(result) {
        resolve(result)
      },
    })
  })
}

export async function getBase64FromUrl(url) {
  const response = await fetch(url)
  const blob = await response.blob()
  const base64 = await readFile(blob)

  return base64
}

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
