const { ethers } = require('ethers')

// 与以太坊节点连接
const provider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/3ee083eb780d4bb38982f6eac516a1e9'
)

// 以太坊主网的 Uniswap V2 工厂合约地址
const factoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'

// Uniswap V2 工厂合约 ABI
const factoryAbi = [
  'function getPair(address tokenA, address tokenB) external view returns (address pair)'
]

// 要查询的代币地址
const tokenAAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' // WETH (Wrapped Ether)
const tokenBAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI

async function getPairPrice() {
  const factoryContract = new ethers.Contract(
    factoryAddress,
    factoryAbi,
    provider
  )

  // 获取代币对应的交易对地址
  const pairAddress = await factoryContract.getPair(
    tokenAAddress,
    tokenBAddress
  )

  // 交易对合约 ABI
  const pairAbi = [
    'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)'
  ]

  const pairContract = new ethers.Contract(pairAddress, pairAbi, provider)

  // 获取交易对储备量
  const reserves = await pairContract.getReserves()

  // 储备量单位转换，假设第一个代币为 WETH，第二个代币为 DAI
  const wethReserve = parseFloat(reserves.reserve0.toString()) / 10 ** 18
  const daiReserve = parseFloat(reserves.reserve1.toString()) / 10 ** 18

  // 计算价格，假设 1 WETH = X DAI
  const price = wethReserve / daiReserve

  console.log(`当前 WETH/DAI 交易对价格为: ${price} DAI`)
}

getPairPrice().catch((err) => console.error('Error:', err))
