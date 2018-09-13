# Crypto booking app

[WIP]

## App configuration
### Install
```bash
$ npm i
```

### .env
You need a `.env` file in the root folder of the project.

```bash
HOTEL_URL=https://demo-api.windingtree.com/hotels/0x4Ee2BC4804D1A75AEBa5C76D25cc2c036B136140
SIGNER_API=http://localhost:3001
CAPTCHA_SITE_KEY=3LfKKmcUVVAADUI1_CpxzyQ1JHz_bYiQ6Tw3vPF
WEB3_PROVIDER=https://ropsten.infura.io/v3/1234567890
BOOKING_POC_ADDRESS=0x028C2ed488804A80e8355590575979397403078C
INITIAL_DATE=2018-09-14T00:00:00Z
FINAL_DATE=2018-09-21T00:00:00Z
```

## Deploy
We use now.sh to deploy.

### Install

#### Manual deploy
Install now as global dependency
```bash
$ npm install -g now
```

Deploy yo now.sh
```bash
$ now
```


```bash
$ now alias
```
