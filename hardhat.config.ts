import { HardhatUserConfig, task } from 'hardhat/config'
import { config as dotEnvConfig } from 'dotenv'
dotEnvConfig()
import 'hardhat-prettier'
import '@typechain/hardhat'
import 'solidity-coverage'
import '@nomiclabs/hardhat-ethers'
import '@openzeppelin/hardhat-upgrades'

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (_args, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.2', // must be 0.8.2 due to ERC1967UpgradeUpgradeable.sol
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
	  accounts: [process.env.PRIVATE_KEY || ""]
    },
    hardhat: {
    //   forking: {
    //     url: 'https://ropsten.infura.io/v3/' + process.env.INFURA_API_KEY,
    //   },
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gasPrice: 8000000000,
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gasPrice: 8000000000,
    },
    rinkeby:{
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    goerli:{
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    arbitrum:{
      url: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    }
  },
}

//npx hardhat run --network ropsten deploy/001_deploy_contracts.ts

export default config
