import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const { classId } = useParams();

  return (
    <div>
      <nav className="side-navbar">
        <ul>
          {classId && <li><Link to={`/dashboard/${classId}/students`}>Student List</Link></li>}
          {classId && <li><Link to={`/dashboard/${classId}/announcement`}>Announcement</Link></li>}
          {classId && <li><Link to={`/dashboard/${classId}/attendance`}>Attendance</Link></li>}
          {classId && <li><Link to={`/dashboard/${classId}/edit-class`}>Edit Class Details</Link></li>}
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>
      <div className="main-content">
      </div>
    </div>
  );
};


export default Dashboard;
