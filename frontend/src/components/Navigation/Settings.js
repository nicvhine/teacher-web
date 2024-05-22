import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../ClassesDashboard/Dashboard";
import { SERVER_URL } from "../../Url";
import "./Settings.css";

const Settings = () => {
  const { classId } = useParams();
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`${SERVER_URL}/api/class/${classId}`, {
        name: className,
        description: classDescription,
        startYear,
        endYear
      });
      console.log(response.data); // Assuming your backend returns a success message
      // Optionally, update the UI or show a success message
    } catch (error) {
      console.error("Error saving changes:", error);
      // Handle error: Display error message or show a notification to the user
    }
  };

  const handleDeleteClass = async () => {
    // Implement logic to delete a class
  };

  return (
    <div className="settings-container">
      <nav className="side-navbar">
        <Sidebar />
      </nav>
      <div className="settings-content">
        <h1 className="settings-title">Settings</h1>
        <div className="edit-class">
          <h2 className="section-title">Edit Class Details</h2>
          <div className="form-group">
            <label htmlFor="className">Name:</label>
            <input
              type="text"
              id="className"
              name="className"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="classDescription">Description:</label>
            <textarea
              id="classDescription"
              name="classDescription"
              rows="4"
              value={classDescription}
              onChange={(e) => setClassDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startYear">Start Year:</label>
            <input
              type="text"
              id="startYear"
              name="startYear"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endYear">End Year:</label>
            <input
              type="text"
              id="endYear"
              name="endYear"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
            />
          </div>
          <button className="btn" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
        <div className="delete-class">
          <h2 className="section-title">Delete Class</h2>
          <p>Are you sure you want to delete this class?</p>
          <button className="btn delete-btn" onClick={handleDeleteClass}>
            Delete Class
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
