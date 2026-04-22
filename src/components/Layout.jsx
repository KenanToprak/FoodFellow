import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, PlusCircle, MessageCircle, User } from 'lucide-react';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="app-container bg-gray-50 min-h-screen">
      {/* Desktop Header */}
      <header className="desktop-header">
        <div className="container flex justify-between items-center h-full">
          <div className="logo flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="logo-icon">🍔</div>
            <span className="text-xl text-primary">FellowFoodie</span>
          </div>
          
          <nav className="desktop-nav flex gap-6">
            <NavLink to="/" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <Home size={20} /> Discover
            </NavLink>
            <NavLink to="/create" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <PlusCircle size={20} /> Create Request
            </NavLink>
            <NavLink to="/chat" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <MessageCircle size={20} /> Messages
            </NavLink>
            <NavLink to="/profile" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <User size={20} /> Profile
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        <NavLink to="/" className={({isActive}) => isActive ? 'mobile-nav-item active' : 'mobile-nav-item'}>
          <Home size={24} />
          <span>Discover</span>
        </NavLink>
        <NavLink to="/create" className={({isActive}) => isActive ? 'mobile-nav-item active' : 'mobile-nav-item'}>
          <PlusCircle size={24} />
          <span>Create</span>
        </NavLink>
        <NavLink to="/chat" className={({isActive}) => isActive ? 'mobile-nav-item active' : 'mobile-nav-item'}>
          <MessageCircle size={24} />
          <span>Messages</span>
        </NavLink>
        <NavLink to="/profile" className={({isActive}) => isActive ? 'mobile-nav-item active' : 'mobile-nav-item'}>
          <User size={24} />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Layout;
