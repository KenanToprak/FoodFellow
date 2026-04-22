import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Mail, Lock, LogIn } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/');
  };

  const handleMockSocial = (provider) => {
    login(`${provider}@mock.com`, '123');
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="logo-icon mx-auto mb-4" style={{ fontSize: '3rem' }}>🍔</div>
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-muted mt-2">Sign in to FellowFoodie</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2">
            <LogIn size={18} /> Sign In
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div className="social-login">
          <button type="button" className="btn btn-outline w-full" onClick={() => handleMockSocial('google')}>
            Sign in with Google
          </button>
        </div>

        <p className="text-center text-sm mt-6">
          Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
