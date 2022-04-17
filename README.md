<h1 align="center"><img width="600" style="border-radius: 30px;" src="https://github.com/treasure-chess/treasure-chess/blob/main/github-header.png?raw=true"/></h1>
<h1 align="center">Welcome to @treasure-chess/treasure-contracts 👋</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/@treasure-chess/treasure-contracts" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@treasure-chess/treasure-contracts.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/treasurechess_" target="_blank">
  <img alt="Twitter: treasurechess_" src="https://img.shields.io/twitter/follow/treasurechess_.svg?style=social" />
  </a>
</p>

> Smart Contracts and Subgraphs for Treasure Chess

**Almost all of the code & tooling for Treasure Chess has been open sourced**. We hope you find these resources useful. Happy hacking!

- App tooling using RedwoodJs https://github.com/pi0neerpat/redwood-devops-example
- Code specific to Treasure Chess (smart contracts, achievements, card generation, etc.) is on our organization page: https://github.com/treasure-chess

## Usage

This package includes resources for interacting with the Treasure Chess contracts. We've provided the Application Binary Interface (ABI), which can be used as follows:

Install the package

```sh
yarn add @treasure-chess/treasure-contracts
```

Import the package, and use `ethers.js` to create the contract

```js
import treasureArtifact from "@treasure-chess/treasure-contracts/artifacts/contracts/Treasure.sol/Treasure.json";
import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";

const treasureAbi = treasureArtifact.abi;
const rpcProvider = new JsonRpcProvider(process.env.MATIC_RPC);

const treasureContract = new Contract(
  "0x...."; // See our docs for the address
  treasureAbi,
  rpcProvider
);

const tx = await treasureContract.balanceOf("0x...")
```

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You also need a `.env` file with the following items:

> NOTE: This section needs updating.

- `ROPSTEN_PRIVATE_KEY`: A private key (account which will deploy) for testing.
- `INFURA_API_KEY`: An infura api key which you can obtain from [infura](https://infura.io).
- `FORWARDER_ADDRESS`: The [opengsn](https://docs.opengsn.org/contracts/addresses.html) forwarder address - this will vary based on which network you are deploying/testing on or if you want to deploy your own forwarder.

## Usage

To run tests, first compile the project with `yarn compile` and then `yarn test`.

To deploy the contracts, simply call `yarn deploy --network <NETWORK>`. Keep in mind, you must add this network to the `hardhat.config.ts` file with the necessary information for this to work.

## Contract verification

We adhere to [EIP 1822](https://eips.ethereum.org/EIPS/eip-1822) and [EIP 1967](https://eips.ethereum.org/EIPS/eip-1967) implementations using Open Zeppelin. In order to find the address of the logic contract, you can follow these steps:

After deploying, not the logic contract addresses for Treasure and TreasureMarket. Use this CLI command to verify on etherscan.

```bash
npx hardhat verify --network [network] [contract address]
```

Another note: even if your contract has some params in the constructor, do not add them to the verification command, because the proxy has handled them.

### Manually check the implementation contract

The logic contracts addresses will be printed out during deployment via `upgrades.erc1967.getImplementationAddress`.

If you want to manually check that these are right try this tool:

1. Navigate to https://etherflow.quiknode.io/ (thanks to Quicknode for providing this powerful tool!) and enter your RPC, eg. https://rpc-mainnet.matic.network
2. Select the `ethers` library and the call `eth_getStorageAt`
3. Enter the address for the proxy contract (this is the one you interact with), and a storage slot of `0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc`. The result should be the address for the logic contract.

### Public user functions

#### Market

Interface for using a token

```sol
function tokenListItem(uint tokenId, uint price, uint duration) public

function tokenUnlistItem(uint tokenId) public

function tokenInstantBuy(uint tokenId) public
```

#### Transfers

```sol
function safeTransferFrom(address from, address to, uint256 tokenId)
```

#### Meta transactions

Make meta transaction calls calling the functions normally, and getting end user to sign them normally. The web3 provider that is created knows where the paymaster + [relayer contracts are deployed](https://docs.opengsn.org/contracts/addresses.html#polygon-matic), and actually sends the transaction through the relayer instead of straight to the Treasure or Treasure Market smart contracts.

GSN example: https://docs.opengsn.org/javascript-client/getting-started.html#adding-gsn-support-to-existing-app

To test upgrading the contract, you first need to deploy the `Treasure` and `TreasureMarket` contracts and copy the addresses over to your `.env` file under `TREASURE_ADDRESS` and `TREASURE_MARKET_ADDRESS`.

The current setup upgrades the contract to `TreasureUpgraded.sol` and `TreasureMarketUpgraded.sol`, but you can modify the `upgradeContracts` function in `scripts/helpers.ts` to upgraded to any contract (change value passed to `getContractFactory`).

To upgrade the contracts, use `yarn upgrade-contracts --network <NETWORK>`.

Example tests of GSN enabled contract: https://github.com/qbzzt/opengsn/blob/master/01_SimpleUse/test/testcontracts.js

Example JS in UI for GSN transactions: https://github.com/qbzzt/opengsn/blob/master/01_SimpleUse/ui/etherless.js

Use the deployed relayer and our Paymaster. Check above for relayer addresses for each network.

```js
import { RelayProvider } from "@opengsn/provider";
import Treasure from "/path/to/artifact";
import PayMaster from "/path/to/artifact";
import TreasureMarket from "/path/to/artifact";

const conf = {
  Treasure: "0xabc123",
  TreasureMarket: "0x1a2b3c",
  paymaster: "0x123abc",
  gasPrice: 1000000000, // 1 Gwei
};

const web3Provider = window.ethereum; // Change for node-js environment

const gsnProvider = new gsn.RelayProvider(web3Provider, {
  forwarderAddress: conf.forwarder, // Needs clarification
  paymasterAddress: conf.paymaster,
  verbose: false, // logging
});
await gsnProvider.init();

gsnProvider = new ethers.providers.Web3Provider(gsnProvider);
userAddr = gsnProvider.origProvider.selectedAddress;
```

Make a GSN contract call

```js
const gsnContractCall = async () => {
  await connect2Gsn(); // Needs clarification
  await provider.ready;

  // Using Treasure transferFrom as an example
  const treasureContract = await new ethers.Contract(
    treasureAddress,
    treasureAbi,
    provider.getSigner(userAddr)
  );

  const tx = await treasureContract.transferFrom();
  console.log(`Transaction ${tx.hash} sent`);

  const receipt = await tx.wait();
  console.log(`Mined in block: ${receipt.blockNumber}`);
};
```

## Show your support

Give a ⭐️ if this project helped you!

## Contributors ✨

👤 **Treasure Chess Community <maintainers@niftychess.com>**

- Website: https://treasurechess.com
- Twitter: [@treasurechess\_](https://twitter.com/treasurechess_)
- GitHub: [@Treasure-Chess](https://github.com/Treasure-Chess)

## 📝 License

Copyright © 2022 Nifty Chess, Inc.<br />
This project is [MIT](https://github.com/Treasure-Chess/chess-achievements/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
