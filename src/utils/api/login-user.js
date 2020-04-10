import { stringify } from 'query-string'
const { API_ROOT } = require('../../const/url')

export function get({ endpoint, Authorization, params = {} }) {
  const url = `${API_ROOT}${endpoint}${stringify(params)}`

  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization,
    },
  })
}

export function post({ endpoint, Authorization, data = {} }) {
  const url = `${API_ROOT}${endpoint}`

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization,
    },
  })
}

export function put({ endpoint, Authorization, data = {} }) {
  const url = `${API_ROOT}${endpoint}`

  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization,
    },
  })
}
