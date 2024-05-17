import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import { SERVER_URL } from "../../Url";
import { Card } from "react-bootstrap";

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
      <nav className="side-navbar" style={{backgroundColor: "#333"}}>
        <ul>
          <h1 style={{marginBottom: '30%'}}>EduTech</h1>
          {classId && (
            <li>
              <Link to={`/dashboard/${classId}`}>Dashboard</Link>
            </li>
          )}
          {classId && (
            <li>
              <Link to={`/dashboard/${classId}/students`}>Student List</Link>
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
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </nav>
      </div>
  );
};


export default Dashboard;
