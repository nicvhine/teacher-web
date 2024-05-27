import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../Url";
import { Link } from "react-router-dom";


const Class = ({ onClassAdded = () => {}}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [group, setGroup] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/class`);
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (!name.trim() || !description.trim() || !group.trim() || !startYear.trim() || !endYear.trim()) {
            setErrorMessage('All fields are required');
            return;
        }

        await axios.post(`${SERVER_URL}/api/class`, {
            name,
            description,
            group,
            startYear,
            endYear
        });

        console.log("Class added successfully");
        onClassAdded();
        setName("");
        setDescription("");
        setGroup("");
        setStartYear("");
        setEndYear("");
        setErrorMessage("");
        setSuccessMessage("Class added successfully");
        fetchClasses();
        
    } catch (error) {
        console.error("Error adding class", error);
        if (error.response && error.response.status === 409) {
            setErrorMessage("A class with the same name and group already exists.");
        } else {
            setErrorMessage("Error adding class. Please try again later.");
        }
    }
};


  
  const handleClassItemClick = (classId) => {
    window.location.href = `/dashboard/${classId}`;
    console.log(`Clicked on class with ID: ${classId}`);
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <style>
        {`
          .class-list {
            list-style-type: none;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
          }

          .class-item {
            flex: 0 0 calc(33.333% - 20px);
            background-color: #888;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 15px;
            margin: 10px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .class-item:hover {
            background-color: #e9ecef;
          }

          .class-item-content {
            font-size: 16px;
            font-weight: 500;
            color: #212529;
          }

          .class-item-content div {
            margin-bottom: 8px;
          }

          .form-container {
            display: flex;
            justify-content: center;
            margin-top: 23px;
            width: 50%;
            margin-left: 25%;
          }

          .form-control {
            background-color: #fff;
            border: 1px solid #ced4da;
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 15px;
            font-size: 16px;
            transition: border-color 0.3s ease;
          }

          .form-control:focus {
            border-color: #80bdff;
            outline: 0;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
          }

          .btn-primary {
            background-color: #007bff;
            border-color: #007bff;
            font-size: 16px;
            font-weight: 500;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease, border-color 0.3s ease;
            margin-left: 40%;
          }

          .btn-primary:hover {
            background-color: #0056b3;
            border-color: #0056b3;
          }

          .text-danger {
            color: #dc3545;
            font-size: 14px;
          }

          .logout-container {
            position: absolute;
            top: 20px;
            right: 20px;
            cursor: pointer;
            z-index: 999;
          }

          .logout-icon {
            color: #007bff;
            text-decoration: none;
            font-size: 16px;
          }

          .logout-icon:hover {
            text-decoration: underline;
          }

          .error-message-container{
            display: flex;
            justify-content: center;
            margin-top: 20px;
            margin-left: 2%;

          }
          
          .success-message-container{
            display: flex;
            justify-content: center;
            margin-top: 20px;
            margin-left: 2%;
          }
        `}
      </style>
      <div className="logout-container">
        <Link to="/" className="logout-icon">Logout</Link>
      </div>
      <div className="error-message-container">
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      </div>
      <div className="success-message-container">
      {successMessage && <div className="text-success">{successMessage}</div>}
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="row mb-4">
            <div className="col-md-12">
              <input
                style={{backgroundColor: '#fff'}}
                type="text"
                className="form-control"
                placeholder="Class Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <textarea
                style={{backgroundColor: '#fff'}}
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <textarea
                style={{backgroundColor: '#fff'}}
                className="form-control"
                placeholder="Group Number"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                style={{backgroundColor: '#fff'}}
                type="number"
                className="form-control"
                placeholder="Start Year"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                style={{backgroundColor: '#fff'}}
                type="number"
                className="form-control"
                placeholder="End Year"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{backgroundColor: "#333", borderStyle: "none", marginBottom: "30px"}}>Add Class</button>
        </form>
      </div>
      <div>
        <ul className="class-list">
          {classes.map((classItem) => (
            <li key={classItem.id} className="class-item">
              <div onClick={() => handleClassItemClick(classItem.id)} className="class-item-content"
                style={
                  {textAlign: "center"}
                }
              >
                <div>{classItem.name}</div>
                <div>{classItem.description}</div>
                <div>{classItem.group}</div>
                <div>{classItem.startYear} - {classItem.endYear}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Class;