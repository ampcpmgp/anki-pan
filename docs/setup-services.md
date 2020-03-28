# Setup Services

Create each account - [infrastructure](#infrastructure).

Required `now login`, then set local env vars in  `.env` file on repository root.
```env
NODE_ENV=local
FAUNA_DB_SECRET=<staging_fauna_db_secret>
```

Setup FaunaDB
* Run `./faunadb/setup-db.fql` on FaunaDB Shell.
* Run `./faunadb/setup-index.fql` on FaunaDB Shell.

Setup auth0
* Create Application, and setting.

Setup Github Actions
* Set Scretes `NOW_ORG_ID`, `NOW_PROJECT_ID`, `ZEIT_TOKEN`.

## Local

```shell
npm run start-dev
# Then open other console tab
now dev
# Aceess http://localhost:3000, And open file `./dist/index.html`
```

## Production & Staging

```shell
now secrets add staging_fauna_db_secret <staging_fauna_db_secret>
now secrets add prod_fauna_db_secret <prod_fauna_db_secret>
```
