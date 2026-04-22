import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, MapPin, Clock } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import './CreateRequest.css';

const CreateRequest = () => {
  const navigate = useNavigate();
  const { addRequest, currentUser, userLocation } = useContext(AppContext);
  const [formData, setFormData] = useState({
    restaurant: '',
    targetAmount: '',
    currentAmount: '',
    expiresIn: '30',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReq = {
      id: 'r' + Date.now(),
      user: currentUser,
      restaurant: formData.restaurant,
      restaurantCategory: 'General',
      targetAmount: Number(formData.targetAmount),
      currentAmount: Number(formData.currentAmount),
      remainingAmount: Number(formData.targetAmount) - Number(formData.currentAmount),
      distance: '0m',
      expiresIn: formData.expiresIn + ' min',
      location: userLocation,
      description: formData.description,
      participants: 1,
      status: 'active'
    };
    addRequest(newReq);
    toast.success('Your request has been created successfully!');
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container py-4 max-w-md mx-auto">
      <div className="mb-6 mt-4 text-center">
        <div className="icon-circle mx-auto mb-2">
          <ShoppingBag size={24} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Create New Request</h1>
        <p className="text-muted">Find a partner to meet the minimum delivery amount</p>
      </div>

      <div className="card animate-slide-up">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="form-group">
            <label className="font-medium text-sm mb-1 block">Restaurant Name</label>
            <input 
              type="text" 
              name="restaurant"
              className="input" 
              placeholder="e.g. Burger King, Dominos..."
              value={formData.restaurant}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="form-group flex-1">
              <label className="font-medium text-sm mb-1 block">Target Amount (₺)</label>
              <input 
                type="number" 
                name="targetAmount"
                className="input" 
                placeholder="e.g. 300"
                value={formData.targetAmount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group flex-1">
              <label className="font-medium text-sm mb-1 block">Your Amount (₺)</label>
              <input 
                type="number" 
                name="currentAmount"
                className="input" 
                placeholder="e.g. 150"
                value={formData.currentAmount}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="font-medium text-sm mb-1 block flex items-center gap-1">
              <Clock size={16} /> Expires in (Minutes)
            </label>
            <select 
              name="expiresIn" 
              className="input"
              value={formData.expiresIn}
              onChange={handleChange}
            >
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="45">45 Minutes</option>
              <option value="60">1 Hour</option>
            </select>
          </div>

          <div className="form-group">
            <label className="font-medium text-sm mb-1 block">Description</label>
            <textarea 
              name="description"
              className="input" 
              rows="3" 
              placeholder="e.g. Need 1 more person for a buy 1 get 1 free campaign."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group mt-2">
            <label className="font-medium text-sm mb-1 block flex items-center gap-1">
              <MapPin size={16} /> Meeting Point
            </label>
            <div className="location-picker">
              Current Location (Auto-detected)
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Publish Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
