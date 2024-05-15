import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import { SERVER_URL } from "../../Url";

const Dashboard = () => {
  const { classId } = useParams();
  const [classInfo, setClassInfo] = useState(null);

  useEffect(() => {
    if (classId) {
      fetchClassInfo(classId);
    }
  }, [classId]);

  const fetchClassInfo = async (id) => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/class/${id}`);
      setClassInfo(response.data);
    } catch (error) {
      console.error('Error fetching class info:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="side-navbar">
        <ul>
          {classId && (
            <li>
              <Link to={`/dashboard/${classId}/students`}>Student List</Link>
            </li>
          )}
          {classId && (
            <li>
              <Link to={`/dashboard/${classId}/announcement`}>Announcement</Link>
            </li>
          )}
          {classId && (
            <li>
              <Link to={`/dashboard/${classId}/attendance`}>Attendance</Link>
            </li>
          )}
          {classId && (
            <li>
              <Link to={`/dashboard/${classId}/edit-class`}>Edit Class Details</Link>
            </li>
          )}
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
      <div className="main-content">
        <div className="class-info">
          {classInfo ? (
            <>
              <h2>Class Information</h2>
              <p>Class Name: {classInfo.name}</p>
              <p>Class ID: {classId}</p>
            </>
          ) : (
            <p>Loading class information...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
