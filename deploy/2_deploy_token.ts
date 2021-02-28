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

  const postDeploy = async (address: string) => {
    await Governance.setActorLevel(address, 2).then((tx) => tx.wait());
    await Points.setToken(address).then((tx) => tx.wait());
    await Points.setWhitelisted(address, true).then((tx) => tx.wait());
  };

  if (!network.live) {
    const result = await deploy("DeFiatToken", {
      from: mastermind,
      log: true,
      args: [Governance.address, Points.address],
    });

    if (result.newlyDeployed) {
      // do any initial setup
      await postDeploy(result.address);
    }
  } else {
    await postDeploy(token);
  }
};

export default func;
func.tags = ["Token"];
