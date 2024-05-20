import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../Url";
import './Navigation.css'; // Import CSS file for styling
import Sidebar from "../ClassesDashboard/Dashboard";

const ResourceLibrary = () => {
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle creating a new folder
  const handleCreateFolder = () => {
    if (newFolderName.trim() === '') return;
    const newFolder = {
      id: Date.now(), // Using timestamp as a unique identifier (replace with UUID in production)
      name: newFolderName,
      files: [],
      subfolders: []
    };
    setFolders([...folders, newFolder]);
    setNewFolderName('');
  };

  // Function to handle adding a file to the current folder
  const handleAddFile = () => {
    if (!currentFolder || !selectedFile) return;
    const updatedFolder = { ...currentFolder, files: [...currentFolder.files, selectedFile] };
    const updatedFolders = folders.map(folder => folder.id === currentFolder.id ? updatedFolder : folder);
    setFolders(updatedFolders);
    setSelectedFile(null);
  };

  // Function to handle file selection
  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Function to handle navigation to a subfolder
  const navigateToFolder = (folder) => {
    setCurrentFolder(folder);
  };

  // Function to render the list of folders and files in the current folder
  const renderFolderContents = () => {
    if (!currentFolder) return null;

    return (
      <div>
        {currentFolder.subfolders.map(subfolder => (
          <div key={subfolder.id} onClick={() => navigateToFolder(subfolder)}>{subfolder.name}</div>
        ))}
        {currentFolder.files.map(file => (
          <div key={file.id}>{file.name}</div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <nav className="side-navbar">
        <Sidebar/>
      </nav>
      <div>
        {/* Input field and button for creating a new folder */}
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button onClick={handleCreateFolder}>Create Folder</button>

        {/* Input field and button for adding a file */}
        <input type="file" onChange={handleFileSelection} />
        <button onClick={handleAddFile}>Add File</button>

        {/* Render the list of folders and files in the current folder */}
        {renderFolderContents()}
      </div>
    </div>
  );
};

export default ResourceLibrary;
