# @treasure-chess/contracts

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#docs">Docs</a>
    </li>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## Docs

## Recent Dev Deploy

Mumbai:
Treasure Contract Address: 0x8C7243028492aEeB49c9306355DAa30B5632DE18
Treasure Market Contract Address: 0x9Ebf0123d8bA676d29aEFa0A490629546cB6DbB3

### Treasure Tips, Tricks, and Design Decisions

- No meta transactions on the main Treasure contract, since only the admin controlled accounts can call minting function , and we only need to make transfers free
- contract name will be changed at the end, since we want to reserve the url /TreasureChess on third party marketplaces and don't want it scrapped if we decide to test on polygon later.
- Overrided `approveForAll` check so that OpenSea and our marketplace do not require an approval transaction for use.
- Achievements are on-chain and also can be part of json URI so make it something that onchain governance can decide
- The `Owner` should be updated to a multisig wallet (gnosis safe) controlled by the dev team, possibly Victor/a lawyer + a DAO for tiebreakers, while `Admins` should be internal addresses controlled

## About The Project

A simple hardhat template modeled off of running `npx hardhat init`.

This project includes:

- `hardhat-prettier`: a plugin that makes it easy to format solidity files based on rules set in `.prettierrc`.
  - `npx hardhat format`
- [hardhat-typechain](https://hardhat.org/plugins/hardhat-typechain.html): a plugin that generates typings files for use in test files and possibly even on the front-end.
- [solidity-coverage](https://hardhat.org/plugins/solidity-coverage.html): a plugin that generates a coverage report on how much of your code has been tested.
  - `npx hardhat coverage`
- `@openzeppelin/hardhat-upgrades`: a plugin which is used in conjunction with hardhat to deploy upgradeable contracts and upgrade them later. The plugin by default prevents you from deploying/upgrading "dangerous" upgradeable contracts.

### Built With

- [hardhat](https://hardhat.org)
- [hardhat-prettier](https://www.npmjs.com/package/hardhat-prettier)
- [hardhat-typechain](https://hardhat.org/plugins/hardhat-typechain.html)
- [solidity-coverage](https://hardhat.org/plugins/solidity-coverage.html)
- [OpenZeppelin Upgrades Plugin](https://docs.openzeppelin.com/upgrades-plugins/1.x/)
- [OpenZeppelin Upgradeable Contracts](https://www.npmjs.com/package/@openzeppelin/contracts-upgradeable)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You also need a `.env` file with the following items:

- `ROPSTEN_PRIVATE_KEY`: A private key (account which will deploy) for testing.
- `INFURA_API_KEY`: An infura api key which you can obtain from [infura](https://infura.io).
- `FORWARDER_ADDRESS`: The [opengsn](https://docs.opengsn.org/contracts/addresses.html) forwarder address - this will vary based on which network you are deploying/testing on or if you want to deploy your own forwarder.

### Installation

Clone the repo

```sh
git clone https://github.com/pi0neerpat/treasure-chess.git
```

Move into this directory and install packages

```
cd contracts/
yarn install
```

## Usage

To run tests, first compile the project with `yarn compile` and then `yarn test`.

To deploy the contracts, simply call `yarn deploy --network <NETWORK>`. Keep in mind, you must add this network to the `hardhat.config.ts` file with the necessary information for this to work.

### public user functions

#### Market

```js
function listItem(uint \_id, uint price, uint duration) public

function cancelSale(uint \_id) public

function instantBuy( uint \_id ) public // **payable**
```

#### Transfers

- function safeTransferFrom( address from, address to, uint256 tokenId)

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

<h1 align="center">Welcome to @treasure-chess/treasure-contracts 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/@treasure-chess/treasure-contracts" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@treasure-chess/treasure-contracts.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

## Usage

> Note: The final contracts will be added once they are published. Until then only the ABIs are available here.

Install the package

```sh
yarn add @treasure-chess/treasure-contracts
```

Example usage:
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
