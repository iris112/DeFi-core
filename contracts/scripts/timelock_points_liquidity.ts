import { ethers, getNamedAccounts } from "hardhat";
import { DeFiatTimelock, IERC20 } from "../typechain";

const BOND_AMOUNT = ethers.utils.parseEther("5000");
const BOND_BLOCKS = 500000;

const main = async () => {
  const { mastermind, pointsLp } = await getNamedAccounts();
  const Token = (await ethers.getContractAt(
    "IERC20",
    pointsLp,
    mastermind
  )) as IERC20;
  const Vault = (await ethers.getContract(
    "DeFiatTimelock",
    mastermind
  )) as DeFiatTimelock;

  await Token.approve(Vault.address, BOND_AMOUNT).then((tx) => tx.wait());
  await Vault.addBondedRewards(BOND_AMOUNT, BOND_BLOCKS).then((tx) =>
    tx.wait()
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
