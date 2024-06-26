import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import { SERVER_URL } from '../../Url';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email.trim() || !password.trim()) {
        setErrorMessage('Email and password cannot be empty.');
        return;
      }

      const response = await axios.post(`${SERVER_URL}/api/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const userData = response.data.user;
        const accessToken = response.data.accessToken; 
        console.log('Login successful:', userData);
        localStorage.setItem('accessToken', accessToken);
        setLoggedIn(true);
      }
    } catch (error) {
      if (error.response.data.error) {
        console.info('Error during login: ', error.response.data.error);
        setErrorMessage(error.response.data.error);
      } else {
        console.info('Error during login');
        setErrorMessage('An error occurred during login. Please try again later.');
      }
    }
  };

  if (loggedIn) {
    return <Navigate to="/class" />;
  }
  return (
    <section className="background-radial-gradient overflow-hidden">
      <style>
        {`
          .background-radial-gradient {
            background-color: #eee;
          }
          .form-control {
            background-color: #;
            color: #000;
            border-color: #000;
          }
          .error-message {
            color: red;
          }
          .login-form {
            margin-top: 50px; 
          }
          .card {
            border: none; /* Remove the border from the card */
          }
        `}
      </style>

      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 login-form">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: '#000', fontSize: '70px' }}>
              EduTech <br />
              <span style={{ color: '#333', fontSize: '40px' }}>Technology for Education</span>
            </h1>
            <p className="mb-10 opacity-60 " style={{ color: '#000', fontSize: '20px'}}>
              With EduTech, teachers can streamline their workflow, saving time and effort in administrative tasks. Whether it's organizing class schedules, communicating with students, or sharing resources, EduTech empowers teachers to focus on what they do best - educating and inspiring their students.
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">

            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
              {errorMessage && <div className="error-message">{errorMessage}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* email */}
                    <div className="col-md-12 mb-4">
                      <div className="form-outline">
                        <input 
                          style={{backgroundColor: '#fff'}}
                          type="email" 
                          className="form-control" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="Email address" 
                        />
                      </div>
                    </div>
                    {/* pass */}
                    <div className="col-md-12 mb-4">
                      <div className="form-outline">
                        <input 
                          type="password" 
                          style={{backgroundColor: '#fff'}}
                          className="form-control" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          placeholder="Password" 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block mb-4">Login</button>
                    <p style={{ color: "#000" }}>Haven't registered yet? <Link to="/register">Register Here.</Link></p>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;