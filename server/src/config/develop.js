module.exports = {
  BOOKING_POC_ADDRESS: process.env.BOOKING_POC_ADDRESS || '0x028C2ed488804A80e8355590575979397403078C',
  LIF_TOKEN_ADDRESS: process.env.LIF_TOKEN_ADDRESS || '0xeb9951021698b42e4399f9cbb6267aa35f82d59d',
  WHITELIST: process.env.WHITELIST || '*',
  SERVER_PORT: process.env.SERVER_PORT || 3001,
  STARTING_BLOCK: process.env.STARTING_BLOCK || 3668521,
  MONGODB_URI: process.env.MONGODB_URI || 'localhost:27017/crypto-booking-test',
  MAIL_API_KEY: process.env.MAIL_API_KEY,
  FROM_EMAIL: process.env.FROM_EMAIL,
  OWNER_PRIVATE_KEY: process.env.OWNER_PRIVATE_KEY || '0x4259ac86777aa87b3e24006fe6bc98a9c726c3618b18541716a8acc1a7161fa2',
  OWNER_ADDRESS: process.env.OWNER_ADDRESS || '0xD037aB9025d43f60a31b32A82E10936f07484246',
  WEB3_PROVIDER: process.env.WEB3_PROVIDER || 'http://localhost:8545',
  MASTER_KEY: process.env.MASTER_KEY,
  GIT_REV: process.env.GIT_REV,
  RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET,
  IS_RECAPTCHA_ON: false,
  INITIAL_DATE: new Date(process.env.INITIAL_DATE),
  FINAL_DATE: new Date(process.env.FINAL_DATE),
  BOOKING_PERIOD_START: new Date(process.env.BOOKING_PERIOD_START),
  BOOKING_PERIOD_END: new Date(process.env.BOOKING_PERIOD_END),
};
