import { writable, get } from 'svelte/store'
import queryString from 'query-string'
import createAuth0Client from '@auth0/auth0-spa-js'
import config from '../../auth0/config.json'

let auth0Promise

export const isAuthenticated = writable(false)

export async function init() {
  auth0Promise = createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    redirect_uri: location.href,
    scope: 'openid profile',
  })

  const auth0 = await auth0Promise

  await updateAuthenticated()

  const checkAuthenticated = get(isAuthenticated)

  // 認証済みの場合は早期リターン
  if (checkAuthenticated) {
    return
  }

  const { code, state } = queryString.parse(location.search)

  // 認証済みでリダイレクトされてきた場合の処理
  if (code && state) {
    await auth0.handleRedirectCallback()
    await updateAuthenticated()

    const { pathname, hash } = location
    window.history.replaceState({}, document.title, `${pathname}${hash}`)
  }
}

export async function getAuth0() {
  await auth0Promise
}

export async function getAuthorization() {
  const auth0 = await auth0Promise
  const value = await auth0.getTokenSilently()

  return `Bearer ${value}`
}

export async function getUserProfile() {
  const auth0 = await auth0Promise
  const value = await auth0.getUser()

  return value
}

export async function login() {
  const auth0 = await auth0Promise

  await auth0.loginWithRedirect({
    redirect_uri: location.href,
  })
}

export async function logout() {
  const auth0 = await auth0Promise

  await auth0.logout({
    redirect_uri: location.href,
  })
}

async function updateAuthenticated() {
  const auth0 = await auth0Promise

  try {
    const checkAuthenticated = await auth0.isAuthenticated()

    isAuthenticated.set(checkAuthenticated)
  } catch (error) {
    console.info(error)
    window.alert(error)
  }
}
