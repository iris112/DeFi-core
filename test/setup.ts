import { deployments, getNamedAccounts } from "hardhat";
import { getAccount } from "../utils";

export const setupDeploy = deployments.createFixture(async () => {
  await deployments.fixture(["Gov", "Points", "Token"]);
  const accounts = await setup();
  return accounts;
});

export const setupUniswap = deployments.createFixture(async () => {
  await deployments.fixture(["Gov", "Points", "Token", "Uniswap"]);
  const accounts = await setup();
  return accounts;
});

export const setup = async () => {
  const { mastermind, alpha, beta, user } = await getNamedAccounts();
  const _mastermind = await getAccount(mastermind);
  const _alpha = await getAccount(alpha);
  const _beta = await getAccount(beta);
  const _user = await getAccount(user);

  return {
    mastermind: _mastermind,
    alpha: _alpha,
    beta: _beta,
    user: _user,
  };
};
