const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

export function cropImage(imageElm, { width, height, x, y }) {
  canvas.width = imageElm.width
  canvas.height = imageElm.height

  context.drawImage(imageElm, x, y, width, height, 0, 0, width, height)
  return canvas.toDataURL()
}

export function getRectangle(imageElm, rectangle) {
  const width = Math.floor(imageElm.width * rectangle.width)
  const height = Math.floor(imageElm.height * rectangle.height)
  const x = Math.floor(imageElm.width * rectangle.left)
  const y = Math.floor(imageElm.height * rectangle.top)

  return {
    width,
    height,
    x,
    y,
  }
}
