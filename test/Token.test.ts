import { expect } from "chai";
import { ethers } from "hardhat";
import { setupDeploy } from "./setup";

describe("DeFiatToken", () => {
  it("Should deploy DeFiat Token", async () => {
    const { mastermind } = await setupDeploy();

    const name = await mastermind.Token.name();
    const symbol = await mastermind.Token.symbol();
    const totalSupply = await mastermind.Token.totalSupply();
    const governance = await mastermind.Token.DeFiat_gov();
    const points = await mastermind.Token.DeFiat_points();
    const burnRate = await mastermind.Token._viewBurnRate();
    const feeRate = await mastermind.Token._viewFeeRate();

    expect(name).eq("DeFiat");
    expect(symbol).eq("DFT");
    expect(totalSupply.toString()).eq(
      ethers.utils.parseEther("500000").toString()
    );
    expect(governance).eq(mastermind.Gov.address);
    expect(points).eq(mastermind.Points.address);
    expect(burnRate.toNumber()).eq(50);
    expect(feeRate.toNumber()).eq(200);
  });

  it("Should be deflationary on transfers", async () => {
    const { mastermind, user } = await setupDeploy();

    await mastermind.Token.transfer(
      user.address,
      ethers.utils.parseEther("100")
    ).then((tx) => tx.wait());

    const balance = await user.Token.balanceOf(user.address);

    expect(balance.toString()).eq(ethers.utils.parseEther("97.5").toString());
  });
});
