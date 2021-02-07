import { DeployFunction } from "hardhat-deploy/types";
import { DeFiatPoints } from "../typechain/DeFiatPoints";

const func: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  ethers,
  network,
}) => {
  const { deploy } = deployments;
  const { mastermind } = await getNamedAccounts();

  if (!network.live) {
    const governance = await deployments.get("DeFiatGov");

    const result = await deploy("DeFiatPoints", {
      from: mastermind,
      log: true,
      args: [governance.address],
    });

    if (result.newlyDeployed) {
      const Points = (await ethers.getContract(
        "DeFiatPoints",
        mastermind
      )) as DeFiatPoints;

      await Points.setAll10DiscountTranches(
        ethers.utils.parseEther("100"),
        ethers.utils.parseEther("500"),
        ethers.utils.parseEther("1000"),
        ethers.utils.parseEther("5000"),
        ethers.utils.parseEther("10000"),
        ethers.utils.parseEther("50000"),
        ethers.utils.parseEther("100000"),
        ethers.utils.parseEther("500000"),
        ethers.utils.parseEther("1000000")
      ).then((tx) => tx.wait());
    }
  }
};

export default func;
func.tags = ["Points"];
