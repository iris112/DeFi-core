import { DeployFunction } from "hardhat-deploy/types";
import { DeFiatGov, DeFiatPoints, DeFiatToken } from "../typechain";

const func: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  ethers,
  network,
}) => {
  const { deploy } = deployments;
  const { mastermind } = await getNamedAccounts();

  if (!network.live) {
    const Governance = (await ethers.getContract(
      "DeFiatGov",
      mastermind
    )) as DeFiatGov;
    const Points = (await ethers.getContract(
      "DeFiatPoints",
      mastermind
    )) as DeFiatPoints;

    const result = await deploy("DeFiatToken", {
      from: mastermind,
      log: true,
      args: [Governance.address, Points.address],
    });

    if (result.newlyDeployed) {
      // do any initial setup
      await Points.setToken(result.address).then((tx) => tx.wait());
    }
  }
};

export default func;
func.tags = ["Token"];
