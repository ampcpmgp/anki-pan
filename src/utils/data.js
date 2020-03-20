export function objToArr(obj) {
  return Object.keys(obj).map(key => ({ key, value: obj[key] }))
}
