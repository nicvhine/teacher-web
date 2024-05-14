// Import BrowserRouter and Routes from React Router v6
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import LoginLanding from './components/Landing/AddClassForm';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route exact path="/" element={<RegisterForm />} />
          <Route exact path="/Login-landing" element={<LoginLanding />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
