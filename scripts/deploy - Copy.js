const { ethers } = require("hardhat");
const { create } = require('ipfs-http-client');

async function uploadFileToIPFS(ipfs, content) {
    try {
        const { path: cid } = await ipfs.add({ content });
        console.log("Uploaded file CID:", cid);
        return cid;
    } catch (error) {
        console.error("Error uploading to IPFS:", error);
        return null;
    }
}

async function main() {
    // Initialize IPFS client with local IPFS node
    const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });
    const content = Buffer.from('Hello, IPFS!'); // Replace with actual file content

    // Upload file content to IPFS and get CID
    const cid = await uploadFileToIPFS(ipfs, content);
    if (!cid) return;

    // Deploy the smart contract
    const [deployer] = await ethers.getSigners();
    const ContractFactory = await ethers.getContractFactory("FederatedModelStorage");
    const contract = await ContractFactory.deploy();
    await contract.deployed();
    console.log("Contract deployed to:", contract.address);

    // Store CID on the blockchain
    const tx = await contract.storeModelCID(cid);
    await tx.wait();
    console.log("Stored CID on blockchain:", cid);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
