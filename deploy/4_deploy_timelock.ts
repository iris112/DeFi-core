import { DeployFunction } from "hardhat-deploy/types";
import { DeFiatGov, DeFiatPoints, DeFiatToken } from "../typechain";

const RELEASE_TIME = 1640995200;

const func: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  ethers,
  network,
}) => {
  const { deploy } = deployments;
  const { mastermind, treasury, pointsLp } = await getNamedAccounts();

  const result = await deploy("DeFiatTimelock", {
    from: mastermind,
    log: true,
    args: [pointsLp, treasury, RELEASE_TIME],
  });
};

export default func;
func.tags = ["Timelock"];
