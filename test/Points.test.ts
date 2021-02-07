import { expect } from "chai";
import { ethers } from "hardhat";
import { setup } from "./setup";

describe("DeFiatPoints", () => {
  it("Should deploy Points", async () => {
    const { mastermind } = await setup();

    const name = await mastermind.Points.name();
    const symbol = await mastermind.Points.symbol();
    const totalSupply = await mastermind.Points.totalSupply();
    const token = await mastermind.Points.token();
    const governance = await mastermind.Points.governance();
    const threshold = await mastermind.Points.viewTxThreshold();
    const firstTranche = await mastermind.Points.discountTranches(1);
    const lastTranche = await mastermind.Points.discountTranches(9);

    expect(name).eq("DeFiat Points v2");
    expect(symbol).eq("DFTPv2");
    expect(totalSupply.eq(0)).true;
    expect(token).eq(mastermind.Token.address);
    expect(governance).eq(mastermind.Gov.address);
    expect(threshold.eq(ethers.utils.parseEther("100"))).true;
    expect(firstTranche.eq(ethers.utils.parseEther("100"))).true;
    expect(lastTranche.eq(ethers.utils.parseEther("1000000"))).true;
  });
});
