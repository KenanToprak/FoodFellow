import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ShieldCheck, CreditCard, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import './Auth.css';

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { myChats } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const chatInfo = myChats.find(c => c.id === id);

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment process
    setTimeout(() => {
      toast.success('Payment received and transferred to the escrow pool!');
      navigate(`/chat/${id}`);
    }, 1500);
  };

  if (!chatInfo) return <div className="text-center mt-12">Basket not found.</div>;

  return (
    <div className="auth-container">
      <div className="mb-6 mt-4 text-center">
        <div className="flex justify-center mb-2 text-green-500">
          <ShieldCheck size={48} />
        </div>
        <h1 className="text-2xl font-bold">Secure Escrow Payment</h1>
        <p className="text-muted text-sm mt-2">
          Your payment is held in the FellowFoodie pool. It won't be transferred to the order owner until you confirm delivery.
        </p>
      </div>

      <div className="card mb-6">
        <h3 className="font-bold mb-4 border-b pb-2">Order Summary</h3>
        <div className="flex justify-between mb-2">
          <span className="text-muted">Restaurant</span>
          <span className="font-medium">{chatInfo.restaurant}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-muted">Order Owner</span>
          <span className="font-medium">{chatInfo.user.name}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
          <span>Amount to Pay</span>
          <span className="text-primary">50 ₺</span>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handlePayment}>
          <div className="form-group mb-4">
            <label className="text-sm font-medium mb-1 block">Name on Card</label>
            <input type="text" className="input w-full" placeholder="John Doe" required />
          </div>
          
          <div className="form-group mb-4">
            <label className="text-sm font-medium mb-1 block">Card Number</label>
            <div className="input-group">
              <CreditCard className="input-icon" size={18} />
              <input type="text" className="input with-icon w-full" placeholder="**** **** **** ****" required />
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="form-group flex-1">
              <label className="text-sm font-medium mb-1 block">Expiry (MM/YY)</label>
              <input type="text" className="input w-full" placeholder="12/25" required />
            </div>
            <div className="form-group flex-1">
              <label className="text-sm font-medium mb-1 block">CVC</label>
              <div className="input-group">
                <Lock className="input-icon" size={18} />
                <input type="text" className="input with-icon w-full" placeholder="***" required />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Processing...' : 'Pay 50 ₺'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
