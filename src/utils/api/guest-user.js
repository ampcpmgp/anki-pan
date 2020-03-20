import { stringify } from 'query-string'
import { API_ROOT } from '../../const/Url'

export function get(endpoint, params = {}) {
  const url = `${API_ROOT}${endpoint}${stringify(params)}`

  return fetch(url, {
    method: 'GET',
  })
}
