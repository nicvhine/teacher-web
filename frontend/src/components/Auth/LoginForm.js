import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Import Navigate
import { SERVER_URL } from '../../Url';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false); // State to track login status

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
                // Login successful
                const userData = response.data.user;
                console.log('Login successful:', userData);
                // Update loggedIn state to true
                setLoggedIn(true);
            } else {
                // Login failed
                console.error('Login failed:', response.data.error);
                setErrorMessage('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred during login. Please try again later.');
        }
    };

    // Redirect to LoginLanding if loggedIn is true
    if (loggedIn) {
        return <Navigate to="/Login-landing" />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
};

export default LoginForm;
