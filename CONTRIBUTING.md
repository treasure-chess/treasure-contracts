# @treasure-chess/contracts

## Docs

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

You need to have npm to use this project.

- npm
  ```sh
  npm install npm@latest -g
  ```

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

For those curious about how upgradability works or what the plugin is doing, you can read the comments in `test/helpers.ts`. If you want more in-depth information, I would recommend reading some of the information [here](https://docs.openzeppelin.com/openzeppelin/upgrades).

To test upgrading the contract, you first need to deploy the `Treasure` and `TreasureMarket` contracts and copy the addresses over to your `.env` file under `TREASURE_ADDRESS` and `TREASURE_MARKET_ADDRESS`.
The current setup upgrades the contract to `TreasureUpgraded.sol` and `TreasureMarketUpgraded.sol`, but you can modify the `upgradeContracts` function in `scripts/helpers.ts` to upgraded to any contract (change value passed to `getContractFactory`).
To upgrade the contracts, use `yarn upgrade-contracts --network <NETWORK>`.

### User functions

#### Owner only minting

```js
mint(
    address player,
    string memory tokenURI,
    bytes32 _moveHash,
    uint8 _level,
    uint16 _achievement1,
    uint16 _achievement2,
    uint16 _achievement3,
    bool _color
  ) public onlyAdmin returns (uint256)
```

## public user functions

### Market

- function listItem(uint \_id, uint price, uint duration) public
- function cancelSale(uint \_id) public
- function instantBuy( uint \_id ) public **payable**

### transfers

- function safeTransferFrom( address from, address to, uint256 tokenId)

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT
