import td from 'testdouble'

export const mockFaunadb = {
  q: {
    Index() {},
    Match() {},
    Collection() {},
    Ref() {},
    Paginate() {},
    Var() {},
    Get() {},
    Select() {},
    Lambda() {},
    Map() {},
  },
  client: {
    query() {},
  },
}

td.replace('./_utils/faunadb', mockFaunadb)
