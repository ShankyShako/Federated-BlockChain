// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FederatedLedger {
    // Structure to store each CID entry
    struct CIDEntry {
        address user;
        string cid;
        uint256 timestamp;
    }

    // Array to store all CID entries
    CIDEntry[] public cidLedger;

    // Mapping to retrieve CIDs by user address
    mapping(address => string[]) private userCIDs;

    // Event emitted when a new CID is logged
    event CIDLogged(address indexed user, string cid, uint256 timestamp);

    // Function to log a CID
    function logCID(string memory _cid) public {
        require(bytes(_cid).length > 0, "CID cannot be empty");
        
        CIDEntry memory newEntry = CIDEntry({
            user: msg.sender,
            cid: _cid,
            timestamp: block.timestamp
        });

        cidLedger.push(newEntry);
        userCIDs[msg.sender].push(_cid);

        emit CIDLogged(msg.sender, _cid, block.timestamp);
    }

    // Function to retrieve all CIDs for a user
    function getUserCIDs(address _user) public view returns (string[] memory) {
        return userCIDs[_user];
    }

    // Function to retrieve the entire CID ledger
    function getAllCIDs() public view returns (CIDEntry[] memory) {
        return cidLedger;
    }

    // Function to get CID count for audit purposes
    function getCIDCount() public view returns (uint256) {
        return cidLedger.length;
    }
}
