import { ethers, getNamedAccounts } from "hardhat";
import {
  DeFiatGov,
  DeFiatPoints,
  DeFiatToken,
  IUniswapV2Factory,
  IUniswapV2Router02,
} from "../typechain";
import IUniswapV2FactoryAbi from "../build/abi/IUniswapV2Factory.json";
import IUniswapV2Router02Abi from "../build/abi/IUniswapV2Router02.json";

export const getAccount = async (account: string) => {
  const Token = await getToken(account);
  const Points = await getPoints(account);
  const Gov = await getGov(account);
  const Router = await getUniswapRouter(account);
  const Factory = await getUniswapFactory(account);

  return {
    address: account,
    Token,
    Points,
    Gov,
    Router,
    Factory,
  };
};

export const getToken = async (account: string): Promise<DeFiatToken> => {
  return (await ethers.getContract("DeFiatToken", account)) as DeFiatToken;
};

export const getPoints = async (account: string): Promise<DeFiatPoints> => {
  return (await ethers.getContract("DeFiatPoints", account)) as DeFiatPoints;
};

export const getGov = async (account: string): Promise<DeFiatGov> => {
  return (await ethers.getContract("DeFiatGov", account)) as DeFiatGov;
};

export const getUniswapRouter = async (
  account: string
): Promise<IUniswapV2Router02> => {
  const { uniswap } = await getNamedAccounts();
  return (await ethers.getContractAt(
    IUniswapV2Router02Abi,
    uniswap,
    account
  )) as IUniswapV2Router02;
};

export const getUniswapFactory = async (
  account: string
): Promise<IUniswapV2Factory> => {
  const Router = await getUniswapRouter(account);
  const factory = await Router.factory();
  return (await ethers.getContractAt(
    IUniswapV2FactoryAbi,
    factory,
    account
  )) as IUniswapV2Factory;
};
