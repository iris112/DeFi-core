import { ethers, getNamedAccounts } from "hardhat";
import { DeFiatTimelock, IERC20 } from "../typechain";

const main = async () => {
  const { mastermind, pointsLp } = await getNamedAccounts();

  const PointsLp = (await ethers.getContractAt(
    "IERC20",
    pointsLp,
    mastermind
  )) as IERC20;
  const Timelock = (await ethers.getContract(
    "DeFiatTimelock",
    mastermind
  )) as DeFiatTimelock;

  const balance = await PointsLp.balanceOf(mastermind);

  await PointsLp.transfer(Timelock.address, balance).then((tx) => tx.wait());
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
