# Crypto Booking [Proof of Concept]

This repository contains all the necessary solutions to offer hotel rooms in exchange for ETH or Lif tokens. It is compound by a web app, server signer, and smart contracts, it connects directly to WT API, the hotel needs to be deployed in one of WT networks.

## Is it a Dapp?

This is the very first app built using the WT Open API for hotel distribution, and since we don't have pricing and availability yet integrated into the API, we are using centralized solutions for now. The goal is to migrate to more decentralized solutions provided by WT in a future..

## App
 The web app to show hotel inventory from WT API is located inside of the [app](https://github.com/windingtree/crypto-booking/tree/develop/app)
directory

## Server
 The server to sign offers and manage bookings is located inside of the [server](https://github.com/windingtree/crypto-booking/tree/develop/server)
directory

## Smart contracts
 The smart contracts to manage rooms availability is located inside of the [smart-contracts](https://github.com/windingtree/crypto-booking/tree/develop/contracts)
directory

## Test

To test in a local environment, you have to:

1.- Run `npm run testnet` in contracts folder and leave it in the background.
2.- Run `npm run deploy-local` in the contracts folder and copy the Lif token and BookingPoC address in the dev configuration files in server and app.
3.- Run `npm run dev` on the server, leave it in the background.
4.- Run `npm start` on the app, leave it in the background.

## Release
### Server

This is the steps to create a new server release.

- Update version in `server/package.json`
- Merge branch into `develop`
- Merge `develop` into `master`
- Merge `master` into `release/server`

 This will trigger the deploy in `Travis-CI`

## Collaborate!

If you want to help and even get a reward for it, you can take any issue by asking to be assigned to it with an estimation. For example: "Can I take this issue? I can have it done in two days".
And of course that if you find an issue or think you can improve the app somehow you are welcome to create an issue and it will be reviewed!
Once you finish it, you can share your ETH address and receive a bounty payment depending on your issue.

- Small issues: 50 USD.
- Medium issues: 100 USD.
- Hard issued: 300 USD.
- Medium priority bonus: 50 USD.
- High priority bonus: 100 USD.

The ETH/USD rate used is the one at the moment of the payment.
