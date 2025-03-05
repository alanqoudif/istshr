'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaVideo, FaMicrophone, FaFileAlt, FaSmile } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import PrivateMode from './PrivateMode';

interface Message {
  id: string;
  sender: 'user' | 'counsellor' | 'system';
  content: string;
  timestamp: Date;
}

interface SessionChatProps {
  sessionId: string;
  counsellorName: string;
  counsellorImage?: string;
  isActive?: boolean;
}

export default function SessionChat({ 
  sessionId, 
  counsellorName, 
  counsellorImage = 'https://randomuser.me/api/portraits/men/32.jpg',
  isActive = true 
}: SessionChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'system',
      content: 'Your session has started. All communications are secure.',
      timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
    },
    {
      id: '2',
      sender: 'counsellor',
      content: `Hello! I'm ${counsellorName}. How can I help you today?`,
      timestamp: new Date(Date.now() - 1000 * 60 * 4) // 4 minutes ago
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isPrivateModeEnabled, setIsPrivateModeEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simulate counsellor response after 1 second
    if (isActive) {
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'counsellor',
          content: 'Thank you for sharing. Can you tell me more about how this has been affecting you?',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };
  
  // Handle private mode toggle
  const handlePrivateModeToggle = (enabled: boolean) => {
    setIsPrivateModeEnabled(enabled);
    
    // Add system message about private mode
    const systemMessage: Message = {
      id: Date.now().toString(),
      sender: 'system',
      content: enabled 
        ? 'Private mode enabled. Messages will be encrypted and automatically deleted after 24 hours.'
        : 'Private mode disabled. Regular messaging resumed.',
      timestamp: new Date()
    };
    
    setMessages([...messages, systemMessage]);
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Session header */}
      <div className="bg-white p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={counsellorImage} 
            alt={counsellorName}
            className="h-10 w-10 rounded-full mr-3"
          />
          <div>
            <h3 className="text-sm font-medium text-gray-900">{counsellorName}</h3>
            <span className={`inline-block h-2 w-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-300'} mr-1`}></span>
            <span className="text-xs text-gray-500">{isActive ? 'Online' : 'Offline'}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" leftIcon={<FaVideo />}>
            Video
          </Button>
          <Button variant="outline" size="sm" leftIcon={<FaMicrophone />}>
            Audio
          </Button>
        </div>
      </div>
      
      {/* Private mode toggle */}
      <div className="p-3 bg-gray-50">
        <PrivateMode isEnabled={isPrivateModeEnabled} onToggle={handlePrivateModeToggle} />
      </div>
      
      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'counsellor' && (
                <img 
                  src={counsellorImage} 
                  alt={counsellorName}
                  className="h-8 w-8 rounded-full mr-2 self-end"
                />
              )}
              
              <div 
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : message.sender === 'system'
                      ? 'bg-gray-200 text-gray-700 mx-auto text-center text-xs'
                      : 'bg-white border text-gray-800'
                } ${isPrivateModeEnabled ? 'border-blue-300' : ''}`}
              >
                <p className={message.sender === 'system' ? 'italic' : ''}>{message.content}</p>
                <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {isPrivateModeEnabled && message.sender !== 'system' && (
                    <span className="ml-2">🔒</span>
                  )}
                </div>
              </div>
              
              {message.sender === 'user' && (
                <div className="h-8 w-8 rounded-full bg-blue-100 ml-2 flex items-center justify-center text-blue-500">
                  U
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message input */}
      <div className="p-3 bg-white border-t">
        <div className="flex items-center">
          <Button variant="ghost" size="sm">
            <FaSmile className="text-gray-500" />
          </Button>
          <Button variant="ghost" size="sm">
            <FaFileAlt className="text-gray-500" />
          </Button>
          <div className="flex-1 mx-2">
            <Input
              type="text"
              placeholder={isPrivateModeEnabled ? "Send secure message..." : "Type your message..."}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              fullWidth
            />
          </div>
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            leftIcon={<FaPaperPlane />}
          >
            Send
          </Button>
        </div>
        {isPrivateModeEnabled && (
          <div className="mt-2 text-xs text-center text-blue-600">
            Private mode active. Messages will be encrypted and auto-deleted.
          </div>
        )}
      </div>
    </div>
  );
} 