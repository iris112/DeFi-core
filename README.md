# DeFiat: Core Smart Contracts

The core Smart Contracts powering a new brand of Decentralized Finance. The DeFiat Token (DFT), DeFiat Points (DFTP), and DeFiat Governance contracts are the main ecosystem components stored here.

https://defiat.net/

## Installation

1. Install dependencies with Yarn

```
yarn install
```

2. Compile contracts & build artifacts with Hardhat

```
yarn compile
```

3. Run tests with Waffle

```
yarn test
```

## Notes

- `DeFiatToken.sol` differs slightly from the mainnet deployment. `Math.sol` is imported for the `max()` function and `ERC20.sol` imports were updated. Overall, this should have no effect when being used to test. Always use a mainnet fork to verify network changes before deployment.

## Contract Addresses

DeFiat Token - https://etherscan.io/token/0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1

DeFiat Points - https://etherscan.io/token/

DeFiat Governance - https://etherscan.io/address/
