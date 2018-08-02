const fetch = require('isomorphic-fetch');
const { handleApplicationError } = require('../errors');
const { RECAPTCHA_SECRET, IS_RECAPTCHA_ON } = require('../config');
let isReCaptchaOn = IS_RECAPTCHA_ON;

const turnOffRecaptcha = () => {
  isReCaptchaOn = false;
};

const turnOnRecaptcha = () => {
  isReCaptchaOn = true;
};

const recaptchaMiddleware = async (req, res, next) => {
  if (!isReCaptchaOn) {
    return next();
  }
  if (!req.body['g-recaptcha-response']) {
    return next(handleApplicationError('noRecaptcha'));
  }

  const URL = `https://google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${req.body['g-recaptcha-response']}`;
  const response = await (await fetch(URL, { method: 'POST' })).json();
  if (!response.success) {
    return next(handleApplicationError('recaptcha'));
  }
  next();
};

module.exports = {
  turnOffRecaptcha,
  turnOnRecaptcha,
  recaptchaMiddleware,
};
