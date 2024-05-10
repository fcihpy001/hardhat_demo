const { time } = require('@nomicfoundation/hardhat-network-helpers')
const { ethers } = require('hardhat')

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log('部署者账号:', deployer.address)

  const Lock = await ethers.getContractFactory('Lock')

  const lockedAmount = 1_000_000_000
  const unlockTime = (await time.latest()) + 365 * 86400

  const usdt = await Lock.deploy(unlockTime, { value: lockedAmount })
  console.log('Lock合约地址:', usdt.target)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
