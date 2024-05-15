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

  useEffect(() => {
  }, [classId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const trimmedName = name.trim();
      const trimmedEmail = email.trim();

      if (!trimmedName || !trimmedEmail) {
        setErrorMessage('Name and email are required.');
        return;
      }

      await axios.post(`${SERVER_URL}/api/class/${classId}/students`, { name: trimmedName, email: trimmedEmail }); 
      console.log('Student added successfully');
      onStudentAdded();
      setName('');
      setEmail('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding student:', error);
      setErrorMessage('Failed to add student. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  return (
    <div>
      <nav className="side-navbar">
        <ul>
          <li><Link to={`/dashboard/${classId}/students`}>Student List</Link></li>
          <li><Link to={`/dashboard/${classId}/announcement`}>Announcement</Link></li>
          <li><Link to={`/dashboard/${classId}/attendance`}>Attendance</Link></li>
          <li><Link to={`/dashboard/${classId}/edit-class`}>Edit Class Details</Link></li>
          <li><Link to="/logout">Logout</Link></li>
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
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
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
                <td>{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
