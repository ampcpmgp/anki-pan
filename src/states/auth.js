import { writable } from 'svelte/store'
import queryString from 'query-string'
import createAuth0Client from '@auth0/auth0-spa-js'
import config from '../auth0/config.json'

let auth0Promise

export const isAuthenticated = writable(false)

export async function init() {
  auth0Promise = createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    redirect_uri: location.href,
  })

  const auth0 = await auth0Promise

  await updateAuthenticated()

  isAuthenticated.subscribe(async value => {
    // 未認証の場合は早期リターン
    if (value) {
      return
    }

    const { code, state } = queryString.parse(location.search)

    // 認証済みでリダイレクトされてきた場合の処理
    if (code && state) {
      await auth0.handleRedirectCallback()
      await updateAuthenticated()

      switch (process.env.NODE_ENV) {
        case value:
          break

        default:
          break
      }
    }
  })
}

export async function getAuth0() {
  return await auth0Promise
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
