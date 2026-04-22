import React, { createContext, useState, useEffect } from 'react';
import { mockRequests as initialRequests, currentUser as initialUser } from '../mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [requests, setRequests] = useState(initialRequests);
  const [currentUser, setCurrentUser] = useState(null);
  const [myChats, setMyChats] = useState([]);
  const [userLocation, setUserLocation] = useState([41.0082, 28.9784]); // Varsayılan İstanbul

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.warn("Location permission denied or unavailable:", error.message);
        }
      );
    }
  }, []);

  const login = (email, password) => {
    setCurrentUser(initialUser);
  };

  const logout = () => {
    setCurrentUser(null);
    setMyChats([]);
  };

  const addRequest = (newRequest) => {
    setRequests([newRequest, ...requests]);
  };

  const joinRequest = (requestId, amount) => {
    const request = requests.find(r => r.id === requestId);
    if (!request) return;

    // Join the request
    setRequests(requests.map(req => {
      if (req.id === requestId) {
        const newCurrent = req.currentAmount + amount;
        return {
          ...req,
          currentAmount: newCurrent,
          remainingAmount: Math.max(0, req.targetAmount - newCurrent),
          participants: req.participants + 1,
        };
      }
      return req;
    }));

    // Add to chats if not already added
    if (!myChats.find(c => c.id === requestId)) {
      setMyChats([
        {
          id: requestId,
          restaurant: request.restaurant,
          user: request.user, // the host
          lastMessage: 'You joined the basket. You can discuss order details.',
          unread: 1,
          time: 'Now'
        },
        ...myChats
      ]);
    }
  };

  return (
    <AppContext.Provider value={{ requests, currentUser, myChats, userLocation, addRequest, joinRequest, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};
