const config = {
  HOTEL_URL: process.env.HOTEL_URL,
  WEB3_PROVIDER: process.env.WEB3_PROVIDER,
  BOOKING_POC_ADDRESS: process.env.BOOKING_POC_ADDRESS,
  SIGNER_API: process.env.SIGNER_API,
  CAPTCHA_SITE_KEY: process.env.CAPTCHA_SITE_KEY,
  INITIAL_DATE: new Date(process.env.INITIAL_DATE),
  FINAL_DATE: new Date(process.env.FINAL_DATE),
};

module.exports = config;
