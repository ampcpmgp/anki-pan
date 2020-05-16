import * as favorites from './favorites'
import * as latest from './latest'
import * as selfMade from './self-made'
import * as cache from './cache'

export { favorites, latest, selfMade, cache }

export function reset() {
  latest.reset()
  selfMade.reset()
  favorites.reset()
  cache.reset()
}
