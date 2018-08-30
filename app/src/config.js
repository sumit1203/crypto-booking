
const configProd = {
  HOTEL_URL: 'https://demo-api.windingtree.com/hotels/0x4Ee2BC4804D1A75AEBa5C76D25cc2c036B136140',
  WEB3_PROVIDER: 'https://infura.io/CusDXRIFRTuTeUQlhKjc',
  BOOKING_POC_ADDRESS: '0xB4323839c0B2B4C58002D769644a798f764063C4',
  SIGNER_API: 'https://crypto-booking-server.windingtree.com',
  CAPTCHA_SITE_KEY: '6LfKmmcUAAAAADUI1_CpxzyQ1JHz_bYiQ6Tw3vPF'
};

const configDev = {
  HOTEL_URL: 'https://demo-api.windingtree.com/hotels/0x4Ee2BC4804D1A75AEBa5C76D25cc2c036B136140',
  WEB3_PROVIDER: 'http://localhost:8545',
  BOOKING_POC_ADDRESS: '0xb8699080ea54e2377e9e011102eb6bd42d233565',
  SIGNER_API: 'http://localhost:3001',
  CAPTCHA_SITE_KEY: '6LfKmmcUAAAAADUI1_CpxzyQ1JHz_bYiQ6Tw3vPF'
};

module.exports = process.env.NODE_ENV == 'production' ? configProd : configDev;
