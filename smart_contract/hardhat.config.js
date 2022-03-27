// https://eth-ropsten.alchemyapi.io/v2/CxtpbyW9tOMjgAOkScYEtgKfo0c6h0i-

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/CxtpbyW9tOMjgAOkScYEtgKfo0c6h0i-',
      accounts: [ '1fcf84c43c55fed568e152f927a7930204643f9da6555c2a3ab0c53efa2fc208' ]
    }
  }
}
