import Compresser from 'compressorjs'

/**
 * compress image
 * @param {file} File
 * @return {Promise<File>}
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

export function getImageSize(image) {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.addEventListener(
      'load',
      () => {
        resolve({
          width: img.width,
          height: img.height,
        })
      },
      {
        once: true,
      }
    )

    img.addEventListener(
      'error',
      e => {
        reject(e)
      },
      {
        once: true,
      }
    )

    img.src = image
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
