import { stringify } from 'query-string'
const { API_ROOT } = require('../../const/Url')

export function get({ endpoint, Authorization, params = {} }) {
  const url = `${API_ROOT}${endpoint}${stringify(params)}`

  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization,
    },
  })
}

export function post({ method, endpoint, Authorization, data = {} }) {
  const url = `${API_ROOT}${endpoint}`

  return fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization,
    },
  })
}
