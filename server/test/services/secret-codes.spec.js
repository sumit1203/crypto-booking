/* eslint-env mocha */
require('dotenv').config({ path: './test/utils/.env' });
const { expect } = require('chai');
const {
  codeGenerator,
} = require('../../src/services/secret-codes');

describe('Secret codes', () => {
  const secret = 'secret';
  const data = 'test123';
  // This was generate with
  // $ echo -n "test123 secret" | hmac256 --binary secret | base64 | head -c 9
  const computedHash = 'vGiiKizkM';
  it('Should compute a correct hash', async () => {
    const code = await codeGenerator(data, secret);
    expect(code).to.be.eql(computedHash);
  });
});
