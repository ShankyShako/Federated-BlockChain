import { ethers } from "hardhat";
import * as IPFS from 'ipfs-core';

async function main() {
    const ipfs = await IPFS.create();
    const content = Buffer.from('Hello, IPFS!');
    const { cid } = await ipfs.add(content);
    console.log("Uploaded file CID:", cid.toString());

    const [deployer] = await ethers.getSigners();
    const ContractFactory = await ethers.getContractFactory("FederatedModelStorage");
    const contract = await ContractFactory.deploy();
    await contract.deployed();
    console.log("Contract deployed to:", contract.address);

    const tx = await contract.storeModelCID(cid.toString());
    await tx.wait();
    console.log("Stored CID on blockchain:", cid.toString());
}

main().catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
});
