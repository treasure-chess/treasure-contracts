import { deployContracts, upgradeContracts } from './helpers'

/**
 * @dev provide the deployed addresses for treasure contract and treasure market
 * This is the output you get from calling deploy
 */
async function main() {
  await upgradeContracts(
    process.env.TREASURE_ADDRESS || '',
    process.env.TREASURE_MARKET_ADDRESS || ''
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
