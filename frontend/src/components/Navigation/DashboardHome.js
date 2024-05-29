import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../Url";
import { Card } from "react-bootstrap";
import Sidebar from "../ClassesDashboard/Dashboard";
import "./Home.css";

const Dashboard = () => {
  const { classId } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [studentCount, setStudentCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchClassInfo = async (id) => {
      try {
        const [classResponse, studentCountResponse, taskCountResponse] = await Promise.all([
          axios.get(`${SERVER_URL}/api/class/${id}`),
          axios.get(`${SERVER_URL}/api/class/${id}/studentCount`),
          axios.get(`${SERVER_URL}/api/class/${id}/taskCount`),
        ]);
        setClassInfo(classResponse.data);
        setStudentCount(studentCountResponse.data.studentCount);
        setTaskCount(taskCountResponse.data.taskCount);
      } catch (error) {
        console.error("Error fetching class info:", error);
      }
    };

    if (classId) {
      fetchClassInfo(classId);
    }

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [classId]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="top-section">
          <div className="name-description-container">
            {classInfo ? (
              <>
                <h1>{classInfo.name}</h1>
                <h2>{classInfo.description}</h2>
              </>
            ) : (
              <p>Loading...</p> 
            )}

            <div className="clock-container">
              <p className="clock">{currentTime.toLocaleTimeString()}</p>
            </div>
          </div>
          <div className="count-container">
            <Card className="numberStudents">
              <Card.Body>
                <Card.Title style={{ textAlign: "center"}}>
                  Number of Students
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: "60px",
                    textAlign: "center",
                    color: "red",
                  }}
                >
                  {studentCount}
                </Card.Text>
                <Link
                  to={`/dashboard/${classId}/students`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="student-count-box">
                    <p style={{ textAlign: "center" }}>View Students</p>
                  </div>
                </Link>
              </Card.Body>
            </Card>

            <Card className="numberTasks">
              <Card.Body>
                <Card.Title style={{ textAlign: "center"}}>
                  Number of Tasks
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: "60px",
                    textAlign: "center",
                    color: "red",
                  }}
                >
                  {taskCount}
                </Card.Text>
                <Link
                  to={`/dashboard/${classId}/tasks`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="student-count-box">
                    <p style={{ textAlign: "center" }}>View Tasks</p>
                  </div>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
