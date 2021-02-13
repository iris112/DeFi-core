import { deployments, getNamedAccounts } from "hardhat";
import { getAccount } from "../utils";

export const setup = deployments.createFixture(async () => {
  await deployments.fixture();

  const { mastermind, governor, partner, user } = await getNamedAccounts();
  const _mastermind = await getAccount(mastermind);
  const _governor = await getAccount(governor);
  const _partner = await getAccount(partner);
  const _user = await getAccount(user);

  return {
    mastermind: _mastermind,
    governor: _governor,
    partner: _partner,
    user: _user,
  };
});
