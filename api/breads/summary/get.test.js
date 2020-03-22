import test from 'ava'
import { mockFaunadb } from '../../_test-helper'
import get from './get'

test('200 Success', async t => {
  const req = {
    query: {
      ref: 'dummy-ref',
      ts: 'dummy-ts',
    },
  }
  const res = {
    statusCode: 200,
    json() {},
  }
  await get(req, res)

  t.is(res.statusCode, 200)
})

test('503 Error', async t => {
  const req = {
    query: {
      ref: 'dummy-ref',
      ts: 'dummy-ts',
    },
  }
  const res = {
    statusCode: 200,
    json() {},
  }

  mockFaunadb.client.query = () => {
    throw 'Error!'
  }

  await get(req, res)

  t.is(res.statusCode, 503)
})
