const { ethers } = require("hardhat");
async function main() {
    const FederatedToken = await ethers.getContractFactory("FederatedToken");
    const federatedToken = await FederatedToken.deploy("FederatedToken", "FED");
    console.log("FederatedToken deployed to:", federatedToken.target);

    const storageToken = await FederatedToken.deploy("FederatedModelStorage", "FED");
    console.log("FederatedToken deployed to:", storageToken.target);
}
main().catch((error) => {
console.error(error);
process.exitCode = 1;
});
