<h1 align="center">Welcome to @treasure-chess/treasure-contracts 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/@treasure-chess/treasure-contracts" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@treasure-chess/treasure-contracts.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Smart Contracts and Subgraphs for Treasure Chess

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

## About The Project

A simple hardhat template created from `npx hardhat init`.

This project includes:

- `hardhat-prettier`: a plugin that makes it easy to format solidity files based on rules set in `.prettierrc`.
  - `npx hardhat format`
- [hardhat-typechain](https://hardhat.org/plugins/hardhat-typechain.html): a plugin that generates typings files for use in test files and possibly even on the front-end.
- [solidity-coverage](https://hardhat.org/plugins/solidity-coverage.html): a plugin that generates a coverage report on how much of your code has been tested.
  - `npx hardhat coverage`
- `@openzeppelin/hardhat-upgrades`: a plugin which is used in conjunction with hardhat to deploy upgradeable contracts and upgrade them later. The plugin by default prevents you from deploying/upgrading "dangerous" upgradeable contracts.

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
