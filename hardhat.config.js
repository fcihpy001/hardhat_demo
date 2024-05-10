require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

task('accounts', 'Prints th ist of account', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.24',
  networks: {
    hardhat: { allowUnlimitedContractSize: false },
    sepolia: {
      chainId: 11155111,
      url: process.env.SEPOLIA_API_URL,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY]
    },
    bsctest: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      accounts: [
        'c41e8ee5b9588dd95d9eb955f50f174b2db36b6fcb1707f736cc53e2827ce7a6'
      ]
    }
  },
  etherscan: {
    apiKey: {
      sepolia: 'B1Q2MC9XKV7KTSVSE1KJ2HTUKRKDIMZ6FA',
      bscTestnet: 'PZWEIIWHWJS4R2C71AJ3T6ZHXKUP2MZ7J7'
    }
  },
  sourcify: {
    enabled: true
  }
}
