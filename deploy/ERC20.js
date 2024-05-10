const { ethers } = require('hardhat')

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log('部署者账号:', deployer.address)

  const TOKEN = await ethers.getContractFactory('WrapBtcCoin')

  const token = await TOKEN.deploy()
  console.log('ERC20合约地址:', token.target)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
