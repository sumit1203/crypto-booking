# Crypto booking server
This server is in charge for handle the events from smart contracts, and send
emails with the necessary information for a correct booking.

## App configuration
### Install
```bash
$ npm i
```

### .env
You need 2 `.env` files in the root folder of the project. One for test and other for running the server.
Test env must be named as `.env.test`.
The OWNER_PRIVATE_KEY goes with the 0x prefix.

```bash
WHITELIST=11.22.33.44,55.66.77.88       
SERVER_PORT=3001
MAIL_API_KEY=long-random-secret-key
FROM_EMAIL=from@example.com
TO_EMAIL=to@example.com
WEB3_PROVIDER=https://ropsten.infura.io/v3/1234567890
BOOKING_POC_ADDRESS=0x028C2ed488804A80e8355590575979397403078C
LIF_TOKEN_ADDRESS=0xeb9951021698b42e4399f9cbb6267aa35f82d59ds
MONGODB_URI=localhost/db-name
SERVER_PORT=3005
OWNER_PRIVATE_KEY=0x4259ac86777aa87b3e24006fe6bc98a9c726c3618b18541716a8acc1a7161fa2
OWNER_ADDRESS=0xD037aB9025d43f60a31b32A82E10936f07484246
STARTING_BLOCK=3668521
MASTER_KEY=xprv9s21ZrQH143K4NJpFe33gMkNvp3WjJ5kB8W2Bc1Kr2fviwJXYd1AaTk1r1kD7HevdSzNdmAkD5FrFXUkMVuMwuSFdpUc72fbsvNgjCShE82
INITIAL_DATE=2018-09-14T00:00:00Z
FINAL_DATE=2018-09-21T00:00:00Z
COINMARKETCAP_KEY=15b3dbf0-d3dd-4033-884e-e4fef11a865f
```

### Run dev mode
Run server in develop mode
```bash
$ npm run dev
```

## Deploy

Deploy are managed by `Travis CI`. Pushing to `release/server` will trigger a deploy stage.
Merge to `release/server` are  allowed only from mater.
Travis must contain this secret variables
- BOOKING_POC_ADDRESS
- FROM_EMAIL
- MAIL_API_KEY
- MONGODB_URI
- NOW_TOKEN
- OWNER_ADDRESS
- OWNER_PRIVATE_KEY
- SERVER_PORT
- STARTING_BLOCK
- WEB3_PROVIDER
- WHITELIST

## Decrypt Database

Export the decrypted booking offers to a json array next to the decrypt script.
```
mongoexport -h MONGODB_URI -d crypto-booking -c bookings -u USER -p PASSWORD --type json -o src/scripts/bookings.json --jsonArray                                
```

Run the decrypt script in production environment with the master key as parameter.
```
NODE_ENV=production MASTER_KEY=xxx node src/scripts/decrypt.js
```

The output will be print in the console.
