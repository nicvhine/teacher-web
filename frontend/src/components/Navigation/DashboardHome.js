import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../Url";
import { Card, Row, Col } from "react-bootstrap";
import Sidebar from "../ClassesDashboard/Dashboard";
import MyCalendar from "./myCalendar"; 
import "./Home.css";

const Dashboard = () => {
  const { classId } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const fetchClassInfo = async (id) => {
      try {
        const [classResponse, studentCountResponse] = await Promise.all([
          axios.get(`${SERVER_URL}/api/class/${id}`),
          axios.get(`${SERVER_URL}/api/class/${id}/studentCount`),
        ]);
        setClassInfo(classResponse.data);
        setStudentCount(studentCountResponse.data.studentCount);
      } catch (error) {
        console.error("Error fetching class info:", error);
      }
    };

    if (classId) {
      fetchClassInfo(classId);
    }
  }, [classId]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        {classInfo ? (
          <>
            <div className="name-description-container">
              <h1>{classInfo.name}</h1>
              <h2>{classInfo.description}</h2>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>
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
          </Col>
          <Col>
            <MyCalendar /> {/* Render the calendar component */}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
