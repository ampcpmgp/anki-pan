import { writable, get } from 'svelte/store'
import queryString from 'query-string'
import createAuth0Client from '@auth0/auth0-spa-js'
import config from '../../auth0'

let auth0Promise

export const isExistsClient = writable(false)
export const isAuthenticated = writable(false)

function createClient() {
  if (process.env.NODE_ENV === 'mock') {
    return Promise.resolve().then(() => ({
      loginWithRedirect() {
        isAuthenticated.set(true)
      },
      logout() {
        isAuthenticated.set(false)
      },
      isAuthenticated() {
        return false
      },
      getTokenSilently() {
        return 'dummy-token'
      },
    }))
  }

  return createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    redirect_uri: location.href,
    scope: 'openid profile',
  })
}

export async function init() {
  auth0Promise = createClient()

  const auth0 = await auth0Promise

  isExistsClient.set(true)

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
  }
}
