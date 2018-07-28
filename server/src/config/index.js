if (!process.env.NODE_ENV) {
  throw new Error('Must set NODE_ENV');
}

module.exports = require(`./${process.env.NODE_ENV}`);
