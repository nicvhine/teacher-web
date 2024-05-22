import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Class from './components/Landing/AddClassForm';
import Dashboard from './components/Navigation/DashboardHome';
import StudentList from './components/Navigation/StudentList';
import Settings from './components/Navigation/Settings';
import TaskManagement from "./components/Navigation/Tasks";

const App = () => {
  const handleTaskAdded = () => {
  };

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/class" element={<Class />} />
          <Route path="/dashboard/:classId/*" element={<Dashboard />} />
          <Route path="/dashboard/:classId/students" element={<StudentList />} />
          <Route path="/dashboard/:classId/settings" element={<Settings />} />
          <Route path="/dashboard/:classId/tasks" element={<TaskManagement onTaskAdded={handleTaskAdded} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
