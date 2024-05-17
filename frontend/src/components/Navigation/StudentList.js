import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { SERVER_URL } from "../../Url";
import './Navigation.css'; 
import Sidebar from "../ClassesDashboard/Dashboard";

const StudentList = ({ onStudentAdded }) => {
  const { classId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'inactive'
  const [errorMessage, setErrorMessage] = useState('');
  const [students, setStudents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    handleStatusChange(studentId, newStatus);
  };


  const handleStatusChange = async (studentId, newStatus) => {
    try {
      await axios.put(`${SERVER_URL}/api/class/${classId}/students/${studentId}/status`, {
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
  
  const filteredStudents = students.filter(student => {
    // Filter by name or email
    const searchMatch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       student.email.toLowerCase().includes(searchQuery.toLowerCase());
    // Filter by status
    const statusMatch = statusFilter === 'all' || student.status === statusFilter;
    return searchMatch && statusMatch;
  });

  return (
    <div>
      <nav className="side-navbar">
        <Sidebar/>
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
        <div className="filter-search-container">
          <div className="search-container">
            <input
              style={{width: "70%"}}
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-container">
          <select style={{marginTop: '20px', marginBottom: '20px'}}className="bg-gray-300 px-3 py-1 rounded-lg w-full lg:w-auto" onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">ALL</option>
            <option value="active">ACTIVE</option>
            <option value="inactive">INACTIVE</option>
          </select>
          </div>
        </div>
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
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <span 
                    style={{  cursor: "pointer", color: student.status === 'active' ? 'green' : 'red' }}
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
