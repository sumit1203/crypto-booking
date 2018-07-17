const crypto = require('crypto');

const codeGenerator = async (data, secret) => {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`${data} ${secret}`);
  const digest = hmac.digest('base64');
  const code = digest.slice(0,9);
  return code;
}

module.exports = {
  codeGenerator,
};
