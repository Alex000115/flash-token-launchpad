const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenFactory", function () {
  it("Should deploy a new token and assign supply", async function () {
    const Factory = await ethers.getContractFactory("TokenFactory");
    const factory = await Factory.deploy();
    await factory.deployed();

    const [owner] = await ethers.getSigners();
    
    const tx = await factory.deployToken("Test", "TST", 1000);
    const receipt = await tx.wait();
    
    const event = receipt.events.find(e => e.event === "TokenDeployed");
    const tokenAddr = event.args.tokenAddress;

    const Token = await ethers.getContractAt("StandardToken", tokenAddr);
    const balance = await Token.balanceOf(owner.address);

    // 1000 * 10^18 (default decimals)
    expect(balance).to.equal(ethers.utils.parseUnits("1000", 18));
  });
});
