import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CreateRequest from './pages/CreateRequest';
import Chat from './pages/Chat';
import ChatRoom from './pages/ChatRoom';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import ProtectedRoute from './components/ProtectedRoute';
import { AppProvider } from './context/AppContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AppProvider>
      <Toaster position="top-center" toastOptions={{ className: 'custom-toast' }} />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><CreateRequest /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/chat/:id" element={<ProtectedRoute><ChatRoom /></ProtectedRoute>} />
            <Route path="/checkout/:id" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
