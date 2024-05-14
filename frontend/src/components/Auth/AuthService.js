const SERVER_URL = 'http://localhost:5000'; // Update with your backend server URL

const AuthService = () => {
  const handleLogin = async (formData) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Authentication successful
        const data = await response.json();
        console.log('Login successful:', data);
      } else {
        // Authentication failed
        const errorData = await response.json();
        console.error('Login failed:', errorData);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleRegister = async (formData) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration successful
        const data = await response.json();
        console.log('Registration successful:', data);
      } else {
        // Registration failed
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return {
    handleLogin,
    handleRegister,
  };
};

export default AuthService;
