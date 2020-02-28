## Anki Pan

絵と音と隠し文字で学ぶ、暗記アプリ。


## Development

### Setup

```shell
npm i
npm i now -g
```

### Local (with am-mocktimes)

execute

```shell
npm start
```

### Local (with zeit now staging api)

Required `now login`, then set local env below vars on  `.env` file in repository root.
```env
FAUNA_DB_SECRET=<fauna_db_secret>
```

execute

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

staging and production

```shell
now secrets add staging_fauna_db_secret <staging_fauna_db_secret>
now secrets add prod_fauna_db_secret <prod_fauna_db_secret>
```
