import { ethers } from "hardhat";
import { DeFiatGov, DeFiatPoints, DeFiatToken } from "../typechain";

export const getAccount = async (account: string) => {
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

export const getToken = async (account: string) => {
  return (await ethers.getContract("DeFiatToken", account)) as DeFiatToken;
};

export const getPoints = async (account: string) => {
  return (await ethers.getContract("DeFiatPoints", account)) as DeFiatPoints;
};

export const getGov = async (account: string) => {
  return (await ethers.getContract("DeFiatGov", account)) as DeFiatGov;
};
