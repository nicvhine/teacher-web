import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../Url";
import { useParams } from "react-router-dom";
import Sidebar from "../ClassesDashboard/Dashboard";
import './Tasks.css'; 

const TaskManagement = ({ onTaskAdded }) => {
  const { classId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [due_date, setDueDate] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/class/${classId}/tasks`);
        setTasks(response.data); 
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [classId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title.trim() || !description.trim() || !due_date) {
        setErrorMessage('Fields cannot be empty.');
        return;
      }

      await axios.post(`${SERVER_URL}/api/class/${classId}/tasks`, {
        title,
        description,
        due_date 
      });

      console.log("Task added successfully");
      onTaskAdded();
      setTitle("");
      setDescription("");
      setDueDate("");
      setErrorMessage("");
      setShowPopup(true);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleStatus = async (taskId, currentStatus) => {
    try {
      let newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
      
      await axios.put(`${SERVER_URL}/api/class/${classId}/tasks/${taskId}/status`, {
        status: newStatus
      });
  
      // Update the status in the component state
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };
  
  
  const filteredTasks = tasks
    .filter(task => {
      // Filter by title or description
      const searchMatch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
      // Filter by status
      const statusMatch = statusFilter === 'all' || task.status === statusFilter;
      return searchMatch && statusMatch;
    })
    .sort((a, b) => {
      // Sort by due date
      const dateA = new Date(a.due_date);
      const dateB = new Date(b.due_date);
      return dateA - dateB;
    })
    .sort((a, b) => {
      // Move completed tasks to the end
      if (a.status === 'completed' && b.status !== 'completed') {
        return 1;
      } else if (a.status !== 'completed' && b.status === 'completed') {
        return -1;
      } else {
        return 0;
      }
    });

  return (
    <div className="task-management-container">
      <nav className="side-navbar">
        <Sidebar />
      </nav>
      <div className="task-management-content">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit} className="task-form">
          <input
            style={{width: "30%", marginBottom: "10px"}}
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
          <input
            style={{width: "80%", marginBottom: "10px"}}
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          </div>
          <input
            style={{width: "11%", marginBottom: "10px"}}
            type="date"
            name="due_date"
            placeholder="Due Date"
            value={due_date}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <div>
          <button type="submit" className="add-task-button"
          style={{marginLeft: "40%"}}
          >Add Task</button>
          </div>
        </form>
       
        <h2>Task List</h2>
        <div className="filter-search-container">
          <div className="search-container">
            <input
              style={{width: "70%"}}
              type="text"
              placeholder="Search by title or description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-container">
            <select style={{marginTop: '20px', marginBottom: '20px'}} className="bg-gray-300 px-3 py-1 rounded-lg w-full lg:w-auto" onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">ALL</option>
              <option value="pending">PENDING</option>
              <option value="completed">COMPLETED</option>
            </select>
          </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <table>
          <thead>
            <tr>
              <th>Due Date</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
             <tr key={task.id}>
             <td>{new Date(task.due_date).toLocaleDateString()}</td>
             <td>{task.title}</td>
             <td>{task.description}</td>
             <td>
               <span 
                 style={{ cursor: "pointer", color: task.status === 'pending' ? 'green' : 'red' }}
                 onClick={() => toggleStatus(task.id, task.status)}
               >
                 {task.status}
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

export default TaskManagement;
