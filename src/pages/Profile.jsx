import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { LogOut, History, ShoppingBag, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container py-4">
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <div className="flex gap-2">
          <button onClick={toggleTheme} className="btn btn-outline" style={{ padding: '0.5rem', color: 'hsl(var(--text))' }}>
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem', color: 'hsl(var(--primary))', borderColor: 'hsl(var(--primary))' }}>
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </div>
      
      <div className="card flex flex-col items-center gap-4 text-center mb-6">
        <img src={currentUser.avatar} alt={currentUser.name} className="w-24 h-24 rounded-full border-4 border-white shadow-sm" />
        <div>
          <h2 className="text-xl font-bold">{currentUser.name}</h2>
          <p className="text-muted flex items-center justify-center gap-1">
            <span className="text-yellow-500">★</span> 5.0 (12 Reviews)
          </p>
        </div>
        
        <div className="flex w-full mt-4 border-t pt-4">
          <div className="flex-1 border-r">
            <div className="text-2xl font-bold text-primary">15</div>
            <div className="text-xs text-muted">Shared Baskets</div>
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold text-green-500">450 ₺</div>
            <div className="text-xs text-muted">Total Saved</div>
          </div>
        </div>
      </div>

      <h3 className="font-bold mb-4 flex items-center gap-2">
        <History size={18} /> Past Baskets
      </h3>
      
      <div className="flex flex-col gap-4">
        {/* Mock Past Orders */}
        {[1, 2, 3].map(i => (
          <div key={i} className="card p-4 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <ShoppingBag size={16} className="text-primary" />
                <span className="font-bold">Burger King</span>
              </div>
              <span className="text-xs text-muted">12 Oct 2026</span>
            </div>
            <p className="text-sm text-muted">Partnered with Ayşe M. • You paid 120 ₺</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
