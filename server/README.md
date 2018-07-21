# Crypto booking server
This server is in charge for handle the events from smart contracts, and send
emails with the necessary information for a correct booking.

## App configuration
### Install
```bash
$ npm i
```
#### Run
Add an `.env` file corresponding to the current environment.

Run server in production mode
```bash
$ npm start
```

### Test
#### Test env
First step is add an `.env` file to `test/utils/`. Ex.

```bash
WHITELIST=11.22.33.44,55.66.77.88       
SERVER_PORT=3001
SECRET=secret
MAILGUN_API_KEY=long-random-secret-key
MAILGUN_DOMAIN=some.domain.org
MAILGUN_FROM_EMAIL=from@example.com
MAILGUN_TO_EMAIL=to@example.com
WEB3_PROVIDER=https://ropsten.infura.io/v3/1234567890
BOOKING_POC_ADDRESS=0x123...321
MONGODB_URI=localhost/db-name
```

## Dev
### Dev .env
Create a new `.env` file with the the following fields.

```bash
WHITELIST=11.22.33.44,55.66.77.88       
SERVER_PORT=3001
SECRET=secret
MAILGUN_API_KEY=long-random-secret-key
MAILGUN_DOMAIN=some.domain.org
MAILGUN_FROM_EMAIL=from@example.com
WEB3_PROVIDER=https://ropsten.infura.io/v3/1234567890
BOOKING_POC_ADDRESS=0x123...321
MONGODB_URI=localhost/db-name
```

### Run dev mode
Run server in develop mode
```bash
$ npm run dev
```
