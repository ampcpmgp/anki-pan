## Anki Pan

絵と音と隠し文字で学ぶ、暗記アプリ。


## Development

### Setup

```shell
npm i
npm i now -g
```

### Local (with am-mocktimes)

```shell
npm start
```

### Local (with zeit now staging api)

Required `now login`, then set local env vars in  `.env` file on repository root.
```env
FAUNA_DB_SECRET=<fauna_db_secret>
```

Execute below.

```shell
npm run start-dev
# other console tab
now dev
# Open file `./dist/index.html`
```

### Storybook

```shell
npm run storybook
```

## Other Setting

```shell
now secrets add staging_fauna_db_secret <staging_fauna_db_secret>
now secrets add prod_fauna_db_secret <prod_fauna_db_secret>
```
