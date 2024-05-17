import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { SERVER_URL } from "../../Url";
import './Navigation.css'; 

const StudentList = ({ onStudentAdded }) => {
  const { classId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [students, setStudents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/class/${classId}/students`);
        setStudents(response.data); 
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [classId]);

  const handleSubmit = async () => {
    try {
      if (!name.trim() || !email.trim()) {
        setErrorMessage('Name and email cannot be empty.');
        return;
      }

      await axios.post(`${SERVER_URL}/api/class/${classId}/students`, {
        name,
        email
      });


      console.log("Student added successfully");
      onStudentAdded();
      setName("");
      setEmail("");
      setErrorMessage("");

      setShowPopup(true);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const toggleStatus = (studentId, currentStatus) => {
    console.log("Toggling status for studentId:", studentId);
    console.log("Current status:", currentStatus);
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    console.log("New status:", newStatus);
    handleStatusChange(studentId, newStatus);
};


  const handleStatusChange = async (studentId, newStatus) => {
    try {
      await axios.put(`${SERVER_URL}/api/class/${classId}/students/${studentId}`, {
        status: newStatus
      });

      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === studentId ? { ...student, status: newStatus } : student
        )
      );
    } catch (error) {
      console.error("Error updating student status:", error);
    }
  };
  
  return (
    <div>
      <nav className="side-navbar">
        <ul>
          <li><Link to={`/dashboard/${classId}`}>Dashboard</Link></li>
          <li><Link to={`/dashboard/${classId}/students`}>Student List</Link></li>
          <li><Link to={`/dashboard/${classId}/announcement`}>Announcement</Link></li>
          <li><Link to={`/dashboard/${classId}/attendance`}>Attendance</Link></li>
          <li><Link to={`/dashboard/${classId}/edit-class`}>Edit Class Details</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </nav>
      <div className="studentList-content">
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Add Student</button>
        </form>
        <h2>Student List</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <span 
                  className={student.status === 'active' ? 'status-active' : 'status-inactive'}
                  onClick={() => toggleStatus(student.id, student.status)}
                  >
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;

