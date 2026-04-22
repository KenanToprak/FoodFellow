import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { MessageCircle } from 'lucide-react';
import './Chat.css';

const Chat = () => {
  const { myChats } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="container py-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 mt-4">Messages</h1>
      
      {myChats.length === 0 ? (
        <div className="card flex flex-col items-center justify-center text-center py-12 text-muted gap-4">
          <MessageCircle size={48} className="text-border opacity-50" />
          <p className="font-medium">You don't have any messages yet.</p>
          <p className="text-sm">Join a shared basket request to start chatting with your matches.</p>
        </div>
      ) : (
        <div className="chat-list">
          {myChats.map(chat => (
            <div 
              key={chat.id} 
              className="chat-list-item card animate-slide-up"
              onClick={() => navigate(`/chat/${chat.id}`)}
            >
              <img src={chat.user.avatar} alt={chat.user.name} className="chat-avatar" />
              <div className="chat-info">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold">{chat.restaurant}</span>
                  <span className="text-xs text-muted">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted chat-preview">{chat.user.name}: {chat.lastMessage}</span>
                  {chat.unread > 0 && (
                    <span className="unread-badge">{chat.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
