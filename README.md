## Anki Pan

絵と音と隠し文字で学ぶ、暗記アプリ。


## Development

### Setup

```shell
npm i
npm i now -g
```

### Local (With am-mocktimes, completely offline)

```shell
npm start
```

### Storybook

```shell
npm run storybook
```

### Local (With `now dev`, and online services)

Required `now login`, then set local env vars in  `.env` file on repository root.
```env
NODE_ENV=local
FAUNA_DB_SECRET=<fauna_db_secret>
```

Execute below.

```shell
npm run start-dev
# Then open other tab
now dev
# Aceess http://localhost:3000, And ppen file `./dist/index.html`
```

## Other Settings

```shell
now secrets add staging_fauna_db_secret <staging_fauna_db_secret>
now secrets add prod_fauna_db_secret <prod_fauna_db_secret>
```
