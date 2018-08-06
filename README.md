# Crypto Booking

This repository contains all the necessary solutions to offer hotel rooms in exchange of ETH or Lif tokens. It is compound by a web app, server signer and smart contracts, it connects directly to WT api, the hotel need to be deployed in one of WT networks.

For more info read the [docs](https://docs.google.com/document/d/1ERV07bu1K4tpnZh7aZhA4Z4MlDQteVH2TwDk5AvWM7w/edit?usp=sharing)

## App
 The web app to show hotel inventory from WT api is located inside of the [app](https://github.com/windingtree/crypto-booking/tree/develop/app)
directory

## Server
 The server to sign offers and manage bookings is located inside of the [server](https://github.com/windingtree/crypto-booking/tree/develop/server)
directory

## Smart contracts
 The smart contracts to manage rooms availability is located inside of the [smart-contracts](https://github.com/windingtree/crypto-booking/tree/develop/smart-contracts)
directory

## Test

To test in a local enviroment you have to:

1.- Run `npm run testnet` in contracts folder and leave it in the background.
2.- Run `npm run deploy-local` in the contracts folder and copy the Lif token and BookingPoC address in the dev configuration files in server and and app.
3.- Run `npm run dev` on server, leave it in the background.
4.- Run `npm start` on app, leave it in the background.

## Release
### Server

This are steps for create a new server release

- Update version in `server/package.json`
- Merge branch into `develop`
- Merge `develop` into `master`
- Merge `master` into `release/server`

 This will trigger the deploy in `Travis-CI`
