import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

// Configure IPFS to use the local daemon
const ipfs = create({
    host: 'localhost', // Localhost
    port: 5001,        // IPFS API port
    protocol: 'http',  // Use HTTP for local IPFS
});

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [cid, setCid] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        try {
            const added = await ipfs.add(file);
            setCid(added.path);
            alert(`File uploaded! CID: ${added.path}`);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div>
            <h1>IPFS File Upload</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload to IPFS</button>
            {cid && <p>File CID: {cid}</p>}
        </div>
    );
};

export default FileUpload;
