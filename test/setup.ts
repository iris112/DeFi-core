import { ethers, deployments, getNamedAccounts } from "hardhat";
import { DeFiatGov, DeFiatPoints, DeFiatToken } from "../typechain";

export const setup = deployments.createFixture(async () => {
  await deployments.fixture();

  const { mastermind, governor, partner, user } = await getNamedAccounts();
  const _mastermind = await getAccount(mastermind);
  const _governor = await getAccount(governor);
  const _partner = await getAccount(partner);
  const _user = await getAccount(user);

  // seed(); // seed the test if needed

  return {
    mastermind: _mastermind,
    governor: _governor,
    partner: _partner,
    user: _user,
  };
});

const getAccount = async (account: string) => {
  const Token = await getToken(account);
  const Points = await getPoints(account);
  const Gov = await getGov(account);

  return {
    address: account,
    Token,
    Points,
    Gov,
  };
};

const getToken = async (account: string) => {
  return (await ethers.getContract("DeFiatToken", account)) as DeFiatToken;
};

const getPoints = async (account: string) => {
  return (await ethers.getContract("DeFiatPoints", account)) as DeFiatPoints;
};

const getGov = async (account: string) => {
  return (await ethers.getContract("DeFiatGov", account)) as DeFiatGov;
};
