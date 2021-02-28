import { ethers, getNamedAccounts } from "hardhat";
import { IUniswapV2Router02, DeFiatPoints } from "../typechain";

const LIQUIDITY_AMOUNT = ethers.utils.parseEther("30000");
const ETH_AMOUNT = ethers.utils.parseEther("20");

const main = async () => {
  const { mastermind, points, uniswap } = await getNamedAccounts();

  const Points = (await ethers.getContract(
    "DeFiatPoints",
    mastermind
  )) as DeFiatPoints;
  const Router = (await ethers.getContractAt(
    "IUniswapV2Router02",
    uniswap,
    mastermind
  )) as IUniswapV2Router02;

  await Points.approve(Router.address, LIQUIDITY_AMOUNT).then((tx) =>
    tx.wait()
  );
  await Router.addLiquidityETH(
    points,
    LIQUIDITY_AMOUNT,
    0,
    0,
    mastermind,
    Date.now() + 900000,
    { value: ETH_AMOUNT }
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
