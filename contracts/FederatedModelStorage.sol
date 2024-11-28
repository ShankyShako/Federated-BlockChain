// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FederatedModelStorage {
    struct FileRecord {
        string cid;              // IPFS CID
        address owner;           // Owner of the file
        bool isEncrypted;        // Indicates if the file is encrypted
    }

    mapping(address => FileRecord[]) public userFiles; // Files owned by each user
    mapping(string => bool) public authorizedDownloads; // Track authorized CIDs for download

    // Event to log file access requests
    event FileAccessRequested(address indexed requester, string cid);
    event FileAccessGranted(string cid);

    // Function to store file metadata (called during upload)
    function storeFile(string memory cid, bool isEncrypted) public {
        userFiles[msg.sender].push(FileRecord(cid, msg.sender, isEncrypted));
    }

    // Request access to a file
    function requestFileAccess(string memory cid) public {
        emit FileAccessRequested(msg.sender, cid);
    }

    // Grant access to a file (owner approves)
    function grantFileAccess(string memory cid) public {
        authorizedDownloads[cid] = true;
        emit FileAccessGranted(cid);
    }

    // Check if a user is authorized to download
    function isAuthorized(string memory cid) public view returns (bool) {
        return authorizedDownloads[cid];
    }
}
