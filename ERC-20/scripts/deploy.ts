import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("Ebak", ["0x479Cfecc96AfE948233313B082FB2E847625eE3c"]);

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});