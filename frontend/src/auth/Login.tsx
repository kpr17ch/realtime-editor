import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Login successful! Redirecting to homepage...');
      login(email); // Benutzername wird gesetzt
      navigate('/'); // Weiterleitung zur Startseite
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2 className="title">Login</h2>
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
        <button onClick={handleLogin} className="button">Login</button>
      </div>
    </div>
  );
};

export default Login;
