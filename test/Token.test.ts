import { expect } from "chai";
import { ethers } from "hardhat";
import { setup } from "./setup";

describe("DeFiatToken", () => {
  it("Should deploy DeFiat Token", async () => {
    const { mastermind } = await setup();

    const name = await mastermind.Token.name();
    const symbol = await mastermind.Token.symbol();
    const totalSupply = await mastermind.Token.totalSupply();
    const governance = await mastermind.Token.DeFiat_gov();
    const points = await mastermind.Token.DeFiat_points();
    const burnRate = await mastermind.Token._viewBurnRate();
    const feeRate = await mastermind.Token._viewFeeRate();

    expect(name).eq("DeFiat");
    expect(symbol).eq("DFT");
    expect(totalSupply.eq(ethers.utils.parseEther("500000"))).true;
    expect(governance).eq(mastermind.Gov.address);
    expect(points).eq(mastermind.Points.address);
    expect(burnRate.eq(50)).true;
    expect(feeRate.eq(200)).true;
  });
});
