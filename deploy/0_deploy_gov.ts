import { DeployFunction } from "hardhat-deploy/types";
import { DeFiatGov } from "../typechain/DeFiatGov";

const func: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  network,
  ethers,
}) => {
  const { deploy } = deployments;
  const { mastermind, treasury } = await getNamedAccounts();

  const result = await deploy("DeFiatGov", {
    from: mastermind,
    log: true,
  });

  if (result.newlyDeployed) {
    const Governance = (await ethers.getContract(
      "DeFiatGov",
      mastermind
    )) as DeFiatGov;

    await Governance.changeTxThreshold(
      ethers.utils.parseEther("5")
    ).then((tx) => tx.wait());
    await Governance.changeBurnRate(50).then((tx) => tx.wait());
    await Governance.changeFeeRate(200).then((tx) => tx.wait());

    if (network.live) {
      await Governance.setFeeDestination(treasury).then((tx) => tx.wait());
    }
  }
};

export default func;
func.tags = ["Gov"];
