import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', { username, email, password });
      localStorage.setItem('token', response.data.token);
      alert('Registration successful! Redirecting to login...');
      navigate('/login'); // Weiterleitung zum Login
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2 className="title">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button onClick={handleRegister} className="button">Register</button>
      </div>
    </div>
  );
};

export default Register;
