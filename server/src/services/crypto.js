const crypto = require('crypto');

function encrypt (data, hash, algorithm = 'aes256') {
  const cipher = crypto.createCipher(algorithm, hash);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt (text, hash, algorithm = 'aes256') {
  const decipher = crypto.createDecipher(algorithm, hash);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

module.exports = { encrypt, decrypt };
