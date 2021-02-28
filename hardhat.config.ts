import "dotenv/config";
import { HardhatUserConfig, task } from "hardhat/config";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-abi-exporter";
import "hardhat-spdx-license-identifier";
import "hardhat-typechain";
import "hardhat-gas-reporter";

task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: "0.6.6",
  paths: {
    artifacts: "./build/artifacts",
    cache: "./build/cache",
    deployments: "./deployments",
  },
  abiExporter: {
    path: "./abi",
    clear: true,
    flat: true,
  },
  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },
  namedAccounts: {
    mastermind: 0,
    alpha: 1,
    beta: 2,
    user: 3,
    uniswap: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    treasury: "0x0419eb10e9c1effb47cb6b5b1b2b2b3556395ae1",
    token: {
      1: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
      4: "0xB571d40e4A7087C1B73ce6a3f29EaDfCA022C5B2",
      31337: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
    },
    points: {
      1: "0xDe3E18eCB613498b9a1483Af51394Ec2259BcD0a",
      4: "0xEe650cDBA51A1cFA7428a4e98Bc801B09F16466A",
      31337: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    },
    gov: {
      1: "0xefcCb112270c3C197b86ff03D26340d82a087F6c",
      4: "0xfe521318261CAc118981d532C0E8D3C2Bf4C1dcE",
      31337: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    },
    tokenLp: {
      1: "0xe2a1d215d03d7e9fa0ed66355c86678561e4940a",
      4: "0xF7426EAcb2b00398D4cefb3E24115c91821d6fB0",
      31337: "0x11C5626eCA6C553010C8F6EDD8Aee6e44ca98610",
    },
    pointsLp: {
      1: "0xb4c36b752b706836ab90ed4e78b058150ae9ed59",
      4: "0xCEBF1e6b266DCE1a32ac57Ee4C0e3100d3198e56",
      31337: "0x604fc78e5985d984156B0287b924ad07A4ECd6e7",
    },
  },
  networks: {
    hardhat: {
      forking: {
        blockNumber: 11768005,
        url: process.env.ALCHEMY_MAIN_KEY || "",
      },
    },
    localhost: {
      url: "http://localhost:8545",
    },
    rinkeby: {
      url: process.env.ALCHEMY_RINKEBY_KEY || "",
      accounts: process.env.DEPLOYER_RINKEBY_KEY
        ? [`0x${process.env.DEPLOYER_RINKEBY_KEY}`]
        : undefined,
    },
    mainnet: {
      gasPrice: 110000000000,
      url: process.env.ALCHEMY_MAIN_KEY || "",
      accounts: process.env.DEPLOYER_MAIN_KEY
        ? [`0x${process.env.DEPLOYER_MAIN_KEY}`]
        : undefined,
    },
  },
};

export default config;
