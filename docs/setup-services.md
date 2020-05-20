# Setup Services

Create each account - [infrastructure](#infrastructure).

```shell
npm i vercel -g
```

Required `vercel login`, then set local env vars in  `.env` file on repository root.
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
* Set Scretes `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `VERCEL_TOKEN`.

## Local

```shell
npm run start-dev
# Then open other console tab
vercel dev
# Aceess http://localhost:3000, And open file `./dist/index.html`
```

## Staging

```shell
vercel secrets add staging_fauna_db_secret <staging_fauna_db_secret>
```

Each time you deploy, change the following settings in your Auth0 staging environment app to the built URL.

* Allowed Callback URLs
* Allowed Logout URLs
* Allowed Web Origins


## Production

```shell
vercel secrets add prod_fauna_db_secret <prod_fauna_db_secret>
```
