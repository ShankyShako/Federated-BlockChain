import { create } from 'ipfs-http-client';



// Connect to the local Hardhat blockchain
const web3 = new Web3('http://127.0.0.1:8545');

// Define getWeb3 at the top to avoid reference errors

const getWeb3 = async () => {
  if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          return web3;
      } catch (error) {
          console.error("User denied account access:", error);
          throw error;
      }
  } else {
      // Use local Hardhat RPC as fallback
      return new Web3('http://127.0.0.1:8545');
  }
};


// Replace this ABI with the ABI from the compiled contract (artifacts)
const abi = [
  {
    "_format": "hh-sol-artifact-1",
    "contractName": "FederatedToken",
    "sourceName": "contracts/FederatedToken.sol",
    "abi": [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "symbol",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "allowance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "needed",
            "type": "uint256"
          }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "needed",
            "type": "uint256"
          }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "approver",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "round",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "aggregatedUpdateHash",
            "type": "string"
          }
        ],
        "name": "ModelUpdateAggregated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "nodeAddress",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "round",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "updateHash",
            "type": "string"
          }
        ],
        "name": "ModelUpdateSubmitted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_aggregatedUpdateHash",
            "type": "string"
          }
        ],
        "name": "aggregateUpdates",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "currentRound",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_round",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "getModelUpdate",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_round",
            "type": "uint256"
          }
        ],
        "name": "getRoundUpdatesCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "roundUpdates",
        "outputs": [
          {
            "internalType": "address",
            "name": "nodeAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "updateHash",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_updateHash",
            "type": "string"
          }
        ],
        "name": "submitModelUpdate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    "linkReferences": {},
    "deployedLinkReferences": {}
  }
];  
// Replace with your deployed contract address
const contractAddress = '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82';
const tokenContract = new web3.eth.Contract(abi, contractAddress);
let Waddress;
async function getWallet() {
    const web3 = await getWeb3()
    Waddress = await web3.eth.requestAccounts()
    const walletBalanceInWei = await web3.eth.getBalance(Waddress[0])
    const walletBalanceInEth = await Math.round(parseFloat(walletBalanceInWei) / 1000000000000000) / 1000
    document.getElementById("balance").innerText = `Balance: ${walletBalanceInEth}`;
}


async function getBalance() {
  const web3 = await getWeb3()
  const walletBalanceInWei = await web3.eth.getBalance(Waddress)
  const walletBalanceInEth = await Math.round(parseFloat(walletBalanceInWei) / 1000000000000000) / 1000
  document.getElementById("balance").innerText = `Balance: ${walletBalanceInEth}`;
}

const IPFS = require('ipfs-http-client');
const ipfs = IPFS.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

async function uploadToIPFS(file) {
    const addedFile = await ipfs.add(file);
    return addedFile.path;  // CID of the uploaded file
}
const contract = new web3.eth.Contract(abi, contractAddress);

async function getModelCID() {

  if (!Waddress) {
    console.error("Wallet address not found. Please connect your wallet first.");
    return;
  }
  const modelCID = await federatedModelStorageContract.methods.modelCIDs(Waddress).call();
  return modelCID;
}
async function getDownload() {
  // IPFS hash of the model file
  
  const modelHash = "YOUR_MODEL_FILE_HASH";
  if (!Waddress) {
    console.error("Wallet address not found. Please connect your wallet first.");
    return;
  }
  try {
    const cid = await getModelCID(Waddress);
    const response = await fetch(`https://ipfs.io/ipfs/${cid}`); // Change to local if needed
    const file = await response.blob();

      // Initiate download
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Federated_ALBERT_Model.bin'; // name your model file
      document.body.appendChild(a);
      a.click();
      a.remove();
  } catch (error) {
      console.error("Error downloading the model file:", error);
  }
}

async function getUpdate() {
  const weightsHash = "YOUR_UPDATED_WEIGHTS_HASH"; // Hash of updated weights

  try {
      const response = await fetch(`https://ipfs.io/ipfs/${weightsHash}`);
      const weightsBlob = await response.blob();
      const weightsArrayBuffer = await weightsBlob.arrayBuffer();

      // Apply the weights to your model (this will depend on your ML library)
      // Assuming a TensorFlow.js model for this example:
      const updatedWeights = new Float32Array(weightsArrayBuffer);
      // Assume `mainModel` is your TensorFlow.js model
      mainModel.setWeights(updatedWeights); // Pseudocode - adjust based on your setup

      console.log("Model weights updated successfully!");
  } catch (error) {
      console.error("Error updating model weights:", error);
  }
}





