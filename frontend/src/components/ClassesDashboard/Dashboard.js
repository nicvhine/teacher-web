import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import { SERVER_URL } from "../../Url";
import { Card } from "react-bootstrap";

const Dashboard = () => {
  const { classId } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchClassInfo(classId);
    
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [classId]);

  const fetchClassInfo = async (id) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('Access token is missing');
        return;
      }

      const response = await axios.get(`${SERVER_URL}/api/class/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setClassInfo(response.data);
    } catch (error) {
      console.error('Error fetching class info:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
  };

  return (
    <div className="dashboard-container">
      <nav className="side-navbar" style={{ backgroundColor: "#333" }}>
        <ul className="list-unstyled">
          <h1 className="mb-4">EduTech</h1>
          {classId && (
            <li className="mb-3">
              <Link className="text-white" to={`/dashboard/${classId}`}>Dashboard</Link>
            </li>
          )}
          {classId && (
            <li className="mb-3">
              <Link className="text-white" to={`/dashboard/${classId}/students`}>Student List</Link>
            </li>
          )} 
          {classId && (
            <li className="mb-3">
              <Link className="text-white" to={`/dashboard/${classId}/tasks`}>Task Management</Link>
            </li>
          )} 
          {classId && (
            <li className="mb-3">
              <Link className="text-white" to={`/dashboard/${classId}/settings`}>Class Management</Link>
            </li>
          )}
          {classId && (
            <li className="mb-3">
              <Link className="text-white" to={`/class`}>Class List</Link>
            </li>
          )} 
          <li className="mb-3">
            <Link className="text-white" to="/" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </nav>

    </div>
  );
};

export default Dashboard;
