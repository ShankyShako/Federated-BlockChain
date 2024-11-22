// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FederatedToken is ERC20 {
    uint public currentRound;

    // Constructor to initialize the token name and symbol
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        currentRound = 1;
    }

    struct ModelUpdate {
        address nodeAddress;
        string updateHash;
        uint timestamp;
    }

    mapping(uint => ModelUpdate[]) public roundUpdates;

    event ModelUpdateSubmitted(address indexed nodeAddress, uint indexed round, string updateHash);
    event ModelUpdateAggregated(uint indexed round, string aggregatedUpdateHash);

    function submitModelUpdate(string memory _updateHash) public {
        require(bytes(_updateHash).length > 0, "Model update cannot be empty");
        roundUpdates[currentRound].push(ModelUpdate({
            nodeAddress: msg.sender,
            updateHash: _updateHash,
            timestamp: block.timestamp
        }));
        emit ModelUpdateSubmitted(msg.sender, currentRound, _updateHash);
    }

    function aggregateUpdates(string memory _aggregatedUpdateHash) public {
        require(bytes(_aggregatedUpdateHash).length > 0, "Aggregated update cannot be empty");
        emit ModelUpdateAggregated(currentRound, _aggregatedUpdateHash);
        currentRound++;
    }

    function getRoundUpdatesCount(uint _round) public view returns (uint) {
        return roundUpdates[_round].length;
    }

    function getModelUpdate(uint _round, uint _index) public view returns (address, string memory, uint) {
        require(_index < roundUpdates[_round].length, "Invalid index for round updates");
        ModelUpdate memory update = roundUpdates[_round][_index];
        return (update.nodeAddress, update.updateHash, update.timestamp);
    }
}

contract FederatedModelStorage {
    mapping(address => string) public modelCIDs;
    address[] public users;

    constructor(){

    }

    function getUsers() external returns ( address[] memory ) {
        return users;
    } 
    

    function storeModelCID(string memory cid) public {
        modelCIDs[msg.sender] = cid;
        for ( uint i = 0; i < users.length; i++){
            if ( users[ i ] == msg.sender ) return;
        }
        users.push( msg.sender );
    }
}