const hre = require("hardhat");

async function main() {
  const Factory = await hre.ethers.getContractFactory("TokenFactory");
  const factory = await Factory.deploy();

  await factory.deployed();

  console.log("TokenFactory deployed to:", factory.address);
  console.log("Copy this address into app.js!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
