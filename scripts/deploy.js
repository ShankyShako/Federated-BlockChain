const { ethers } = require("hardhat");

async function main() {
  const FederatedToken = await ethers.getContractFactory("FederatedToken");
  const federatedToken = await FederatedToken.deploy("FederatedToken", "FED");
  console.log("FederatedToken deployed to:", federatedToken.target);

  const FederatedModelStorage = await ethers.getContractFactory("FederatedModelStorage");
  const federatedModelStorage = await FederatedModelStorage.deploy();
  console.log("FederatedModelStorage deployed to:", federatedModelStorage.target);

  const FederatedLedger = await ethers.getContractFactory("FederatedLedger");
  const federatedLedger = await FederatedLedger.deploy();
  console.log("FederatedLedger deployed to:", federatedLedger.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
