import { writable, derived } from 'svelte/store'
import queryString from 'query-string'
import createAuth0Client from '@auth0/auth0-spa-js'
import config from '../auth0/config.json'

let auth0

export const existsClient = writable(false)
export const isAuthenticated = writable(false)

export const accessToken = derived(
  isAuthenticated,
  async ($isAuthenticated, set) => {
    if ($isAuthenticated) {
      const value = await auth0.getTokenSilently()

      set(value)
    }
  }
)

export const userProfile = derived(
  isAuthenticated,
  async ($isAuthenticated, set) => {
    if ($isAuthenticated) {
      const value = await auth0.getUser()

      set(value)
    }
  }
)

export async function init() {
  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  })

  await updateAuthenticated()

  isAuthenticated.subscribe(async value => {
    // 未認証の場合は早期リターン
    if (value) {
      existsClient.set(true)

      return
    }

    const { code, state } = queryString.parse(location.search)

    // 認証済みでリダイレクトされてきた場合の処理
    if (code && state) {
      await auth0.handleRedirectCallback()
      await updateAuthenticated()
      window.history.replaceState({}, document.title, '/')
    }

    existsClient.set(true)
  })
}

export async function login() {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin,
  })
}

export async function logout() {
  await auth0.logout({
    redirect_uri: window.location.origin,
  })
}

async function updateAuthenticated() {
  try {
    const checkAuthenticated = await auth0.isAuthenticated()

    isAuthenticated.set(checkAuthenticated)
  } catch (error) {
    console.info(error)
    window.alert(error)
  }
}
