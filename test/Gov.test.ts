import { expect } from "chai";
import { ethers } from "hardhat";
import { setupDeploy } from "./setup";

describe("DeFiatGov", () => {
  it("Should deploy Governance", async () => {
    const { mastermind } = await setupDeploy();

    const burnRate = await mastermind.Gov.viewBurnRate();
    const feeRate = await mastermind.Gov.viewFeeRate();
    const feeDestination = await mastermind.Gov.viewFeeDestination();
    const txThreshold = await mastermind.Gov.viewTxThreshold();
    const mastermindAddress = await mastermind.Gov.mastermind();

    expect(burnRate.toNumber()).eq(50);
    expect(feeRate.toNumber()).eq(200);
    expect(feeDestination).eq(mastermind.address);
    expect(txThreshold.toString()).eq(ethers.utils.parseEther("5").toString());
    expect(mastermindAddress).eq(mastermind.address);
  });

  it("Should have correct actors", async () => {
    const { mastermind } = await setupDeploy();

    const mastermindLevel = await mastermind.Gov.viewActorLevelOf(
      mastermind.address
    );
    const tokenLevel = await mastermind.Gov.viewActorLevelOf(
      mastermind.Token.address
    );

    expect(mastermindLevel.toNumber()).eq(3);
    expect(tokenLevel.toNumber()).eq(2);
  });
});
