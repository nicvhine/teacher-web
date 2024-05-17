import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../Url";
import './Navigation.css'; // Import CSS file for styling

const UpdateDetails = () => {
    const { classId } = useParams(); // Extract classId from URL
    const [classDetails, setClassDetails] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        startYear: "",
        endYear: ""
    });

    useEffect(() => {
        // Fetch class details when component mounts
        axios.get(`${SERVER_URL}/class/${classId}`)
            .then(response => {
                setClassDetails(response.data);
                setFormData({
                    name: response.data.name,
                    description: response.data.description,
                    startYear: response.data.startYear,
                    endYear: response.data.endYear
                });
            })
            .catch(error => {
                console.error("Error fetching class details:", error);
            });
    }, [classId]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`${SERVER_URL}/class/${classId}`, formData)
            .then(response => {
                console.log("Class details updated successfully:", response.data);
                // Optionally, you can redirect the user to another page or show a success message
            })
            .catch(error => {
                console.error("Error updating class details:", error);
            });
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
                <h2>Edit Class Details</h2>
                <form onSubmit={handleSubmit} className="add-student-form">
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Start Year:</label>
                        <input type="text" name="startYear" value={formData.startYear} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>End Year:</label>
                        <input type="text" name="endYear" value={formData.endYear} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn">Update Class</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateDetails;
