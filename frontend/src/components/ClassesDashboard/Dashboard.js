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
    if (classId) {
      fetchClassInfo(classId);
    }

    // Update current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
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
              <Link className="text-white" to={`/class`}>Class List</Link>
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
              <Link className="text-white" to={`/dashboard/${classId}/library`}>Resource Library</Link>
            </li>
          )}
          {classId && (
            <li className="mb-3">
              <Link className="text-white" to={`/dashboard/${classId}/settings`}>Settings</Link>
            </li>
          )}
          <li className="mb-3">
            <Link className="text-white" to="/">Logout</Link>
          </li>
        </ul>
      </nav>
      <div className="clock-container">
        <p className="clock">{currentTime.toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default Dashboard;
