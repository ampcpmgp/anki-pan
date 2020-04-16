import * as latest from './latest'
import * as selfMade from './self-made'

export { latest, selfMade }

export function reset() {
  latest.reset()
  selfMade.reset()
}
