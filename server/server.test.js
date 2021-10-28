const dotenv = require('dotenv');

dotenv.config();

describe('Dotenv', () => {
  it('should return values', () => {
    expect(process.env.API_KEY).not.toBeFalsy();
    expect(process.env.PORT).not.toBeFalsy();
    expect(process.env.ETH_ADDRESS).not.toBeFalsy();
  });
});
