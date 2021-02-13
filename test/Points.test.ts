import { expect } from "chai";
import { ethers } from "hardhat";
import { setupDeploy } from "./setup";

describe("DeFiatPoints", () => {
  it("Should deploy Points", async () => {
    const { mastermind } = await setupDeploy();

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
    expect(threshold.toString()).eq(ethers.utils.parseEther("40").toString());
    expect(firstTranche.toString()).eq(
      ethers.utils.parseEther("100").toString()
    );
    expect(lastTranche.toString()).eq(
      ethers.utils.parseEther("1000000").toString()
    );
  });

  it("Should update discounts", async () => {
    const { mastermind, user } = await setupDeploy();

    await mastermind.Points.overrideLoyaltyPoints(
      mastermind.address,
      ethers.utils.parseEther("500")
    ).then((tx) => tx.wait());

    await mastermind.Points.updateMyDiscount().then((tx) => tx.wait());

    await mastermind.Token.transfer(
      user.address,
      ethers.utils.parseEther("100")
    ).then((tx) => tx.wait());

    const level = await mastermind.Points.viewDiscountOf(mastermind.address);
    const balance = await user.Token.balanceOf(user.address);

    expect(level.eq(20)).true;
    expect(balance.eq(ethers.utils.parseEther("98"))).true;
  });

  it("Should mint on eligible transfers", async () => {
    const { mastermind, user } = await setupDeploy();

    const transferUserPoints = async (amount: string) => {
      await mastermind.Token.transfer(
        user.address,
        ethers.utils.parseEther(amount)
      ).then((tx) => tx.wait());

      const balance = await mastermind.Points.balanceOf(mastermind.address);
      return balance;
    };

    const txThreshold = await mastermind.Points.viewTxThreshold();
    const thresholdString = txThreshold
      .div(ethers.utils.parseEther("1"))
      .toString();

    const balance1 = await transferUserPoints("1");
    const balance2 = await transferUserPoints(thresholdString);
    const balance3 = await transferUserPoints("10000");

    expect(balance1.toNumber()).eq(0);
    expect(balance2.toString()).eq(ethers.utils.parseEther("1").toString());
    expect(balance3.toString()).eq(ethers.utils.parseEther("2").toString());
  });

  it("Should redirect points to origin", async () => {
    const { mastermind, user } = await setupDeploy();

    await mastermind.Token.approve(
      user.address,
      ethers.utils.parseEther("2000")
    );

    await user.Token.transferFrom(
      mastermind.address,
      user.address,
      ethers.utils.parseEther("1000")
    );
    const balance1 = await user.Points.balanceOf(user.address);

    // set mastermind as redirection
    await mastermind.Points.setRedirection(
      mastermind.address,
      true
    ).then((tx) => tx.wait());

    await user.Token.transferFrom(
      mastermind.address,
      user.address,
      ethers.utils.parseEther("1000")
    );
    const balance2 = await user.Points.balanceOf(user.address);

    expect(balance1.toString()).eq(ethers.utils.parseEther("0").toString());
    expect(balance2.toString()).eq(ethers.utils.parseEther("1").toString());
  });
});
