import { DeployFunction } from "hardhat-deploy/types";
import {
  DeFiatPoints,
  DeFiatToken,
  IUniswapV2Factory,
  IUniswapV2Router02,
} from "../typechain";

const func: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  ethers,
  network,
}) => {
  const { log } = deployments;
  const { mastermind, uniswap } = await getNamedAccounts();

  if (!network.live) {
    console.log("Adding DFT and DFTP Liquidity to Uniswap");

    const Token = (await ethers.getContract(
      "DeFiatToken",
      mastermind
    )) as DeFiatToken;
    const Points = (await ethers.getContract(
      "DeFiatPoints",
      mastermind
    )) as DeFiatPoints;
    const Router = (await ethers.getContractAt(
      "IUniswapV2Router02",
      uniswap,
      mastermind
    )) as IUniswapV2Router02;

    const weth = await Router.WETH();
    const factory = await Router.factory();
    const Factory = (await ethers.getContractAt(
      "IUniswapV2Factory",
      factory,
      mastermind
    )) as IUniswapV2Factory;

    await Token.approve(uniswap, ethers.constants.MaxUint256).then((tx) =>
      tx.wait()
    );
    await Points.approve(uniswap, ethers.constants.MaxUint256).then((tx) =>
      tx.wait()
    );
    await Points.overrideLoyaltyPoints(
      mastermind,
      ethers.utils.parseEther("100000")
    ).then((tx) => tx.wait());

    console.log("Adding DFT to Uniswap...");
    await Router.addLiquidityETH(
      Token.address,
      ethers.utils.parseEther("1000"),
      "0",
      "0",
      mastermind,
      Date.now() + 30000,
      { value: ethers.utils.parseEther("10") }
    ).then((tx) => tx.wait());

    const tokenLp = await Factory.getPair(Token.address, weth);
    console.log(`Added DFT/ETH LP at ${tokenLp}`);

    console.log("Adding DFTP to Uniswap...");
    await Router.addLiquidityETH(
      Points.address,
      ethers.utils.parseEther("1000"),
      "0",
      "0",
      mastermind,
      Date.now() + 30000,
      { value: ethers.utils.parseEther("10") }
    ).then((tx) => tx.wait());

    const pointsLp = await Factory.getPair(Points.address, weth);
    console.log(`Added DFTP/ETH LP at ${pointsLp}`);
  }
};

export default func;
func.tags = ["Uniswap"];
