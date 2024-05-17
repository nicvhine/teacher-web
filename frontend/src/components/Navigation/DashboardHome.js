import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../Url";
import { Card } from "react-bootstrap";
import Sidebar from '../ClassesDashboard/Dashboard';
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
        <Sidebar/>
      <div className="main-content">
          {classInfo ? (
            <>
              <h2>Cn</h2>
              <p>Class Name: {classInfo.name}</p>
              <p>Class ID: {classId}</p>
            </>
          ) : (
            <p>Loading class information...</p>
          )}
        </div>
      </div>
  );
};

const ClassDetailsCard = ({ classInfo }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{classInfo.name}</Card.Title>
        <Card.Text>
          Description: {classInfo.description}
          <br />
          Years: {classInfo.startYear} - {classInfo.endYear}
          <br />
          Number of Students: {classInfo.students.length}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Dashboard;
