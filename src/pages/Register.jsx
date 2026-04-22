import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Mail, Lock, User } from 'lucide-react';
import './Auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password); // Mock registration logs in automatically
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1 className="text-2xl font-bold">Create an Account</h1>
        <p className="text-muted mt-2">Join FellowFoodie and start saving</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="text-sm font-medium mb-1 block">Full Name</label>
            <div className="input-group">
              <User className="input-icon" size={18} />
              <input 
                type="text" 
                className="input with-icon w-full" 
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="text-sm font-medium mb-1 block">Email</label>
            <div className="input-group">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                className="input with-icon w-full" 
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>
          
          <div className="form-group mb-6">
            <label className="text-sm font-medium mb-1 block">Password</label>
            <div className="input-group">
              <Lock className="input-icon" size={18} />
              <input 
                type="password" 
                className="input with-icon w-full" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
