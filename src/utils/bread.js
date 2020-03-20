import BreadType from '../const/bread-type'
import { Base64 } from 'js-base64'

export function getColor(type) {
  switch (type) {
    case BreadType.NEW:
      return 'rgb(255,81,0)'
    case BreadType.FAVORITE:
      return 'hotpink'
    case BreadType.SELF_MADE:
      return 'deepskyblue'
    case BreadType.CACHE:
      return 'bisque'
    default:
      console.warn(`BreadType: ${type}, not found`)
  }
}

export function getFrameBase64(type) {
  const svg = `<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 200 200" width="200pt" height="200pt">
    <defs>
      <clipPath id="_clipPath_3mWc3i21XSwBRUaIaTcm2qTE7GGRxMjg">
        <rect width="200" height="200"/>
      </clipPath>
    </defs>
    <g clip-path="url(#_clipPath_3mWc3i21XSwBRUaIaTcm2qTE7GGRxMjg)">
      <path d=" M 2 194 L 194 194 L 194 27.407 Q 156.839 -0.854 88.71 3.608 Q 20.581 8.071 2 27.407 L 2 194 Z " fill="rgb(255,255,255)" vector-effect="non-scaling-stroke" stroke-width="5" stroke="${getColor(
        type
      )}" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/>
    </g>
  </svg>`

  return `data:image/svg+xml;base64,${Base64.encode(svg)}`
}
