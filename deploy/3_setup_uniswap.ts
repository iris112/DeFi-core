import { DeployFunction } from "hardhat-deploy/types";
import { DeFiatPoints, DeFiatToken, IUniswapV2Router02 } from "../typechain";
import IUniswapV2Router02Abi from "../build/abi/IUniswapV2Router02.json";

const func: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  ethers,
  network,
}) => {
  const { mastermind, uniswap } = await getNamedAccounts();

  if (!network.live) {
    // approve both tokens
    const Token = (await ethers.getContract(
      "DeFiatToken",
      mastermind
    )) as DeFiatToken;
    const Points = (await ethers.getContract(
      "DeFiatPoints",
      mastermind
    )) as DeFiatPoints;
    const Router = (await ethers.getContractAt(
      IUniswapV2Router02Abi,
      uniswap,
      mastermind
    )) as IUniswapV2Router02;

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

    await Router.addLiquidityETH(
      Token.address,
      ethers.utils.parseEther("1000"),
      "0",
      "0",
      mastermind,
      Date.now() + 30000,
      { value: ethers.utils.parseEther("10") }
    ).then((tx) => tx.wait());

    await Router.addLiquidityETH(
      Points.address,
      ethers.utils.parseEther("1000"),
      "0",
      "0",
      mastermind,
      Date.now() + 30000,
      { value: ethers.utils.parseEther("10") }
    ).then((tx) => tx.wait());
  }
};

export default func;
func.tags = ["Uniswap"];
