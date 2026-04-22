import React, { useState, useContext } from 'react';
import { MapPin, Clock, Users, ChevronRight, Check, X } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './RequestCard.css';

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return '?';
  const R = 6371e3;
  const p1 = lat1 * Math.PI / 180;
  const p2 = lat2 * Math.PI / 180;
  const dp = (lat2 - lat1) * Math.PI / 180;
  const dl = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(dp / 2) * Math.sin(dp / 2) +
            Math.cos(p1) * Math.cos(p2) *
            Math.sin(dl / 2) * Math.sin(dl / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;
  if (d < 1000) return Math.round(d) + 'm';
  return (d / 1000).toFixed(1) + 'km';
};

const RequestCard = ({ request }) => {
  const { joinRequest, userLocation } = useContext(AppContext);
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = useState(false);
  const [joinAmount, setJoinAmount] = useState('');
  const percentage = Math.min(100, Math.round((request.currentAmount / request.targetAmount) * 100));
  
  const distanceStr = request.distance === '0m' ? 'Current location' : calculateDistance(userLocation[0], userLocation[1], request.location[0], request.location[1]);

  const handleJoinClick = () => {
    if (request.currentAmount >= request.targetAmount) {
      toast.error('This basket has already reached its target!');
      return;
    }
    setIsJoining(true);
  };

  const handleConfirmJoin = () => {
    const amount = parseInt(joinAmount, 10);
    if (amount > 0 && amount <= request.remainingAmount) {
      joinRequest(request.id, amount);
      toast.success('Successfully joined the basket!');
      setIsJoining(false);
      navigate('/chat');
    } else {
      toast.error('Please enter a valid amount.');
    }
  };

  return (
    <div className="card request-card animate-slide-up">
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <img src={request.user.avatar} alt={request.user.name} className="avatar" />
          <div className="flex-col">
            <span className="font-semibold">{request.user.name}</span>
            <span className="text-xs text-muted flex items-center gap-1">
              <span className="star">★</span> {request.user.rating}
            </span>
          </div>
        </div>
        <div className="badge">{distanceStr} away</div>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-bold">{request.restaurant}</h3>
        <p className="text-sm text-muted mb-2">{request.restaurantCategory}</p>
        <p className="text-sm mb-4">"{request.description}"</p>
      </div>

      <div className="progress-container mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium">Basket: {request.currentAmount} ₺ / {request.targetAmount} ₺</span>
          <span className="text-primary font-bold">{percentage}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
        </div>
        <div className="text-xs text-muted mt-1 text-right">{request.remainingAmount} ₺ left to target</div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <div className="flex gap-4 text-sm text-muted">
          <div className="flex items-center gap-1">
            <Clock size={16} /> {request.expiresIn}
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} /> {request.participants} People
          </div>
        </div>
        
        {isJoining ? (
          <div className="flex items-center gap-2 animate-slide-up">
            <input 
              type="number" 
              className="input" 
              style={{ width: '70px', padding: '0.4rem', textAlign: 'center' }}
              placeholder="₺" 
              value={joinAmount}
              onChange={(e) => setJoinAmount(e.target.value)}
              autoFocus
            />
            <button className="btn btn-primary btn-sm flex items-center justify-center" onClick={handleConfirmJoin} style={{ width: '32px', padding: 0 }}>
              <Check size={16} />
            </button>
            <button className="btn btn-outline btn-sm flex items-center justify-center" onClick={() => setIsJoining(false)} style={{ width: '32px', padding: 0 }}>
              <X size={16} />
            </button>
          </div>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={handleJoinClick}>
            Join <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
