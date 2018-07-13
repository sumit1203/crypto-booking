# Crypto booking app
[WIP]

## App configuration
### Install
```bash
$ npm i
```
#### Run
Add an `.env` file corresponding to the current environment.

Run server im production mode
```bash
$ npm run dev


### Test
#### Test env
First step is add an `.env` file to `test/utils/`. Ex.

```bash
WHITELIST=11.22.33.44,55.66.77.88       # Optional
SERVER_PORT=3001                        # Optional
MAILGUN_API_KEY=long-random-secret-key
MAILGUN_DOMAIN=some.domain.org
MAILGUN_FROM_EMAIL=from@example.com
MAILGUN_TO_EMAIL=to@example.com
```

## Dev
### Dev .env
Create a new `.env` file with the the following fields.

```bash
WHITELIST=11.22.33.44,55.66.77.88       # Optional
SERVER_PORT=3001                        # Optional
MAILGUN_API_KEY=long-random-secret-key
MAILGUN_DOMAIN=some.domain.org
MAILGUN_FROM_EMAIL=from@example.com
```

### Run
Run server in develop mode
```bash
$ npm run dev
```
