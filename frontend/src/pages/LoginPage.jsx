import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');  // State for success/failure message

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        setLoginMessage('Login successful! Redirecting...');  // Success message
        setTimeout(() => {
          navigate('/home');
        }, 1500);  // Redirect after a brief delay
      } else {
        setLoginMessage(data.message || 'Something went wrong');
      }
    } catch (err) {
      setLoginMessage('Login failed, please try again');
    }
  };

  return (
    <div>
    <Navbar/>
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {/* Displaying the login message */}
      {loginMessage && <p>{loginMessage}</p>}
    </div>
    </div>
  );
};

export default LoginPage;
