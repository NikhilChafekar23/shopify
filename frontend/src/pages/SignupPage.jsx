import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignupPage.css";
import Navbar from '../components/Navbar';

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),  // Make sure "username" is included
      });
  
      const data = await response.json();
      if (response.status === 201) {
        alert('Signup successful!');
        navigate('/login'); // Redirect to login page
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
    <Navbar/>
    <div className='signup'>
    
      <div className='container'>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <button type="submit">Signup</button>
        </form>
        <div className="login-prompt">
          <p>Already have an account?</p>
          <button onClick={handleLoginRedirect}>Login</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignupPage;
