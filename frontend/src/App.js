import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Class from './components/Landing/AddClassForm';
import Dashboard from './components/Navigation/DashboardHome';
import StudentList from './components/Navigation/StudentList';
import Attendance from './components/Navigation/Attendance';
import EditClassDetails from './components/Navigation/EditClassDetails';


const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/class" element={<Class />} />
          <Route path="/dashboard/:classId/*" element={<Dashboard />} />
          <Route path="/dashboard/:classId/students" element={<StudentList />} />
          <Route path="/dashboard/:classId/attendance" element={<Attendance />} />
          <Route path="/dashboard/:classId/edit-class" element={<EditClassDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
