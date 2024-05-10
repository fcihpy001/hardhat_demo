const { ethers } = require('hardhat')

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log('部署者账号:', deployer.address)

  const USDT = await ethers.getContractFactory('Splitter')

  const usdt = await USDT.deploy()
  console.log('分账合约地址:', usdt.target)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
