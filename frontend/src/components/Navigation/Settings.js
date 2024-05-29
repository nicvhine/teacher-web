// Import React and other necessary modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../Url";
import { useParams, Link} from "react-router-dom";
import Sidebar from "../ClassesDashboard/Dashboard";
import "./Settings.css";

const Settings = ({ }) => {
  const { classId } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [ setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/class/${classId}/tasks`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [classId]);

  const fetchClassInfo = async (id) => {
    try {
      const [classResponse, studentCountResponse] = await Promise.all([
        axios.get(`${SERVER_URL}/api/class/${id}`),
      ]);
      setClassInfo(classResponse.data);
      if (!name) setName(classResponse.data.name);
      if (!description) setDescription(classResponse.data.description);
      if (!startYear) setStartYear(classResponse.data.startYear);
      if (!endYear) setEndYear(classResponse.data.endYear);
    } catch (error) {
      console.error("Error fetching class info:", error);
    }
  };

  useEffect(() => {
    if (classId) {
      fetchClassInfo(classId);
    }
  }, [classId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name.trim() || !description.trim() || !startYear || !endYear) {
        setErrorMessage("Fields cannot be empty.");
        return;
      }

      await axios.put(`${SERVER_URL}/api/class/${classId}`, {
        name,
        description,
        startYear,
        endYear,
      });

      console.log("Class details updated successfully");
      setErrorMessage("");
      setSuccessMessage("Class updated successfully");
    } catch (error) {
      console.error("Error updating class details:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${SERVER_URL}/api/class/${classId}`);
      console.log("Class deleted successfully");
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  return (
    <div className="task-management-container">
      <nav className="side-navbar">
        <Sidebar />
      </nav>
      <div className="task-management-content">
        <h2>Edit Class Details</h2>
        <div className="error-message-container">
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      </div>
      <div className="success-message-container">
      {successMessage && <div className="text-success">{successMessage}</div>}
      </div>
        <form onSubmit={handleSubmit} className="task-form">
          <p>Class Name</p>
          <input
            style={{ width: "10%", marginBottom: "10px" }}
            type="text"
            name="name"
            placeholder={classInfo ? classInfo.name : "Class Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Class Description</p>
          <div>
            <input
              style={{ width: "50%", marginBottom: "10px" }}
              type="text"
              name="description"
              placeholder={
                classInfo ? classInfo.description : "Class Description"
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <p>Class Year</p>
            <input
              style={{ width: "10%", marginBottom: "10px" }}
              type="text"
              name="startYear"
              placeholder={
                classInfo ? classInfo.startYear : "Year"
              }
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            />
            <input
              style={{ width: "10%", marginBottom: "10px" }}
              type="text"
              name="endYear"
              placeholder={
                classInfo ? classInfo.endYear : "Year"
              }
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="add-task-button"
            >
              Update Class
            </button>
            <Link
              to="/class"
              className="delete-task-button"
              onClick={handleDelete}
              style={{
                textDecoration: 'none',
                padding: "12px 15px",
                margin: "5px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer"
              }}
            >
              Delete Class
            </Link>


          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
