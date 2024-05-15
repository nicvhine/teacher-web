import React, { useState } from "react";
import axios from "axios";
import {SERVER_URL} from "../../Url";

const RegisterForm = ({ onUserAdded }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!email.trim() || !username.trim() || !password.trim())  {
        setErrorMessage("Title and description cannot be empty.");
        return; 
      }

      await axios.post(`${SERVER_URL}/api/users`, { email, username, password });
      console.log('User added successfully');
      onUserAdded();
      setEmail('');
      setUsername('');
      setPassword('');
      setErrorMessage("");
      
      setShowPopup(true);

    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button type="submit">Register</button>
  </form>
  );
};

export default RegisterForm;