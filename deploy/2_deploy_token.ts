import { DeployFunction } from "hardhat-deploy/types";
import { DeFiatGov, DeFiatPoints } from "../typechain";

const func: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  ethers,
  network,
}) => {
  const { deploy } = deployments;
  const { mastermind, token } = await getNamedAccounts();

  const Governance = (await ethers.getContract(
    "DeFiatGov",
    mastermind
  )) as DeFiatGov;
  const Points = (await ethers.getContract(
    "DeFiatPoints",
    mastermind
  )) as DeFiatPoints;

  if (!network.live) {
    const result = await deploy("DeFiatToken", {
      from: mastermind,
      log: true,
      args: [Governance.address, Points.address],
    });

    if (result.newlyDeployed) {
      // do any initial setup
      await Governance.setActorLevel(result.address, 2).then((tx) => tx.wait());
      await Points.setToken(result.address).then((tx) => tx.wait());
    }
  } else {
    await Governance.setActorLevel(token, 2).then((tx) => tx.wait());
    await Points.setToken(token).then((tx) => tx.wait());
  }
};

export default func;
func.tags = ["Token"];
