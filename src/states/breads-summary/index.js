import * as favorites from './favorites'
import * as latest from './latest'
import * as selfMade from './self-made'

export { favorites, latest, selfMade }

export function reset() {
  latest.reset()
  selfMade.reset()
  favorites.reset()
}
