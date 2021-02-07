import { expect } from "chai";
import { setup } from "./setup";

describe("DeFiatGov", () => {
  it("Should deploy Governance", async () => {
    const { mastermind } = await setup();

    const feeDestination = await mastermind.Gov.viewFeeDestination();
    const mastermindAddress = await mastermind.Gov.mastermind();

    expect(feeDestination).eq(mastermind.address);
    expect(mastermindAddress).eq(mastermind.address);
  });
});
