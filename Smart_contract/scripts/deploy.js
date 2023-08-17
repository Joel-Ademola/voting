const hre = require("hardhat");

const main = async () => {
  try {
    const MyContract = await hre.ethers.getContractFactory("E_Voting");
    const myContract = await MyContract.deploy();

    await myContract.waitForDeployment();

    console.log("MyContract deployed to:", myContract);
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
