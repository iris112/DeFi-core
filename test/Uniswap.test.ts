import { expect } from "chai";
import { ethers } from "hardhat";
import { setupUniswap } from "./setup";
import IERC20Abi from "../abi/IERC20.json";
import { IERC20 } from "../typechain";

describe("UniswapAddition", () => {
  it("Should deploy add liquidity to Uniswap", async () => {
    const { mastermind } = await setupUniswap();
    const { Factory, Points, Router, Token } = mastermind;

    const weth = await Router.WETH();
    const tokenLp = await Factory.getPair(Token.address, weth);
    const pointsLp = await Factory.getPair(Points.address, weth);

    const TokenLp = (await ethers.getContractAt(
      IERC20Abi,
      tokenLp,
      mastermind.address
    )) as IERC20;
    const PointsLp = (await ethers.getContractAt(
      IERC20Abi,
      pointsLp,
      mastermind.address
    )) as IERC20;

    const tokenLpBalance = await TokenLp.balanceOf(mastermind.address);
    const pointsLpBalance = await PointsLp.balanceOf(mastermind.address);

    expect(tokenLp).not.eq("0x");
    expect(pointsLp).not.eq("0x");
    expect(tokenLpBalance.toString()).not.eq("0");
    expect(pointsLpBalance.toString()).not.eq("0");
  });
});
