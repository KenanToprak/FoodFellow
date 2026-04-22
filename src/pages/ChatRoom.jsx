import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ArrowLeft, Send } from 'lucide-react';
import './ChatRoom.css';

const ChatRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { myChats, currentUser } = useContext(AppContext);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  
  const chatInfo = myChats.find(c => c.id === id);
  
  const [messages, setMessages] = useState([
    { id: 1, senderId: 'system', text: 'You joined the basket. You can discuss order details.', time: 'Now' }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!chatInfo) {
    return <div className="container py-4 text-center mt-12">Chat not found or you haven't joined a basket yet.</div>;
  }

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setMessages([
      ...messages, 
      { 
        id: Date.now(), 
        senderId: currentUser.id, 
        text: newMessage, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }
    ]);
    setNewMessage('');
    
    // Auto reply mock
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          senderId: chatInfo.user.id,
          text: 'Great! I will place the order then. Could you send me your exact address?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  return (
    <div className="chatroom-container animate-slide-up">
      {/* Chat Header */}
      <div className="chatroom-header">
        <button onClick={() => navigate('/chat')} className="back-btn flex items-center justify-center">
          <ArrowLeft size={24} />
        </button>
        <img src={chatInfo.user.avatar} alt={chatInfo.user.name} className="chatroom-avatar" />
        <div className="flex-col flex-1">
          <h2 className="font-bold leading-tight">{chatInfo.restaurant}</h2>
          <span className="text-xs text-muted leading-tight">Partnered with {chatInfo.user.name}</span>
        </div>
        <button 
          className="btn btn-primary" 
          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
          onClick={() => navigate(`/checkout/${chatInfo.id}`)}
        >
          Pay / Checkout
        </button>
      </div>

      {/* Messages Area */}
      <div className="chatroom-messages">
        {messages.map(msg => {
          const isMe = msg.senderId === currentUser.id;
          const isSystem = msg.senderId === 'system';
          
          if (isSystem) {
            return (
              <div key={msg.id} className="system-message">
                <span>{msg.text}</span>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`message-bubble-wrapper ${isMe ? 'mine' : 'theirs'}`}>
              <div className={`message-bubble ${isMe ? 'mine' : 'theirs'}`}>
                {msg.text}
                <div className="message-time">{msg.time}</div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form className="chatroom-input-area" onSubmit={handleSend}>
        <input 
          type="text" 
          className="chat-input" 
          placeholder="Type a message..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="send-btn" disabled={!newMessage.trim()}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
