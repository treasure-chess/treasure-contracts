<h1 align="center">Welcome to @treasure-chess/treasure-contracts 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/@treasure-chess/treasure-contracts" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@treasure-chess/treasure-contracts.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Treasure Chess contract library

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

## Authors

👤 **Joseph Schiarizzi**

- GitHub: [@jschiarizzi](https://github.com/jschiarizzi)

👤 **0xdavinchee**

- GitHub: [@0xdavinchee](https://github.com/0xdavinchee)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
