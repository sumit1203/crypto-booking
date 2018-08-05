
const configProd = {
  HOTEL_URL: 'https://demo-api.windingtree.com/hotels/0x4Ee2BC4804D1A75AEBa5C76D25cc2c036B136140',
  WEB3_PROVIDER: 'https://ropsten.infura.io/CusDXRIFRTuTeUQlhKjc',
  BOOKING_POC_ADDRESS: '0xA83f78A5b3490b9D6A45B6ada3fF31FAf752566D',
  SIGNER_API: 'https://crypto-booking-server.windingtree.com',
  CAPTCHA_SITE_KEY: '6LfKmmcUAAAAADUI1_CpxzyQ1JHz_bYiQ6Tw3vPF'
};

const configDev = {
  HOTEL_URL: 'https://demo-api.windingtree.com/hotels/0x4Ee2BC4804D1A75AEBa5C76D25cc2c036B136140',
  WEB3_PROVIDER: 'http://localhost:8545',
  BOOKING_POC_ADDRESS: '0x7ef3b2ad53f66ff07c37609519d2f0c80e0b4be7',
  SIGNER_API: 'http://localhost:3001',
  CAPTCHA_SITE_KEY: '6LfKmmcUAAAAADUI1_CpxzyQ1JHz_bYiQ6Tw3vPF'
};

module.exports = process.env.NODE_ENV == 'production' ? configProd : configDev;
