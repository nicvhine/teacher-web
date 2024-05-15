import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../Url";
import "./AddClassForm.css";

const Class = ({ onClassAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/class`);
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!name.trim() || !description.trim() || !startYear || !endYear) {
        setErrorMessage('Name, description, start year, and end year are required.');
        return;
      }

      await axios.post(`${SERVER_URL}/api/class`, { name, description, startYear, endYear });
      console.log('Class added successfully');
      onClassAdded();
      setName('');
      setDescription('');
      setStartYear('');
      setEndYear('');
      setErrorMessage('');
      fetchClasses(); 
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  const handleClassItemClick = (classId) => {

    window.location.href = `/dashboard/${classId}`;
    console.log(`Clicked on class with ID: ${classId}`);
  };

  return (
    <div className="AddClassForm-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Class Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Start Year"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
        />
        <input
          type="number"
          placeholder="End Year"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
        />
        <button type="submit">Add Class</button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
      <div>
        <h2>Added Classes:</h2>
        <ul>
          {classes.map((classItem) => (
            <li key={classItem.id}>
              <button onClick={() => handleClassItemClick(classItem.id)}>
                <div>Name: {classItem.name}</div>
                <div>Description: {classItem.description}</div>
                <div>Start Year: {classItem.startYear}</div>
                <div>End Year: {classItem.endYear}</div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Class;
