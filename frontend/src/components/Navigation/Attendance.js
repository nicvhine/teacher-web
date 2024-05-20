// AttendancePage.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../../Url";

const AttendancePage = () => {
  const { classId } = useParams();
  const [students, setStudents] = useState([]);

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

  const handleAttendanceChange = async (studentId, attendance) => {
    try {
      await axios.put(`${SERVER_URL}/api/class/${classId}/students/${studentId}/attendance`, {
        attendance
      });

      // Update local state or re-fetch students
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  return (
    <div>
      <h2>Attendance</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <input
                  type="checkbox"
                  checked={student.attendance}
                  onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePage;
