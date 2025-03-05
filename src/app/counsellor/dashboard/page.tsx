'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaUser, 
  FaCalendarAlt, 
  FaUsers, 
  FaCog, 
  FaSignOutAlt, 
  FaCheckCircle, 
  FaTimesCircle,
  FaComments,
  FaUserCog,
  FaClipboardList,
  FaHistory
} from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { authService } from '@/lib/auth';
import { UserRole } from '@/types';

// Types for the dashboard
interface SessionRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  sessionType: 'video' | 'phone';
  requestedDate: Date;
  requestedTime: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

interface UpcomingSession {
  id: string;
  userId: string;
  userName: string;
  sessionType: 'video' | 'phone';
  date: Date;
  time: string;
  duration: number; // in minutes
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export default function CounsellorDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('requests');
  
  // State for session requests
  const [sessionRequests, setSessionRequests] = useState<SessionRequest[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<UpcomingSession[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Check if user is authenticated and is a counsellor
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }
    
    if (user.role !== UserRole.COUNSELLOR) {
      router.push('/dashboard');
      return;
    }
    
    setCurrentUser(user);
    loadSessionRequests();
    loadUpcomingSessions();
    loadMessages();
    setIsLoading(false);
  }, [router]);
  
  // Load session requests from localStorage or API
  const loadSessionRequests = () => {
    // Try to load from localStorage first
    const storedRequests = localStorage.getItem('istashr_session_requests');
    if (storedRequests) {
      try {
        const parsedRequests = JSON.parse(storedRequests, (key, value) => {
          if (key === 'requestedDate') {
            return new Date(value);
          }
          return value;
        });
        setSessionRequests(parsedRequests);
        return;
      } catch (error) {
        console.error('Failed to parse stored session requests:', error);
      }
    }
    
    // Fall back to mock data
    const mockRequests: SessionRequest[] = [
      {
        id: '1',
        userId: 'user1',
        userName: 'Ahmed Ali',
        userEmail: 'ahmed@example.com',
        sessionType: 'video',
        requestedDate: new Date(Date.now() + 86400000), // tomorrow
        requestedTime: '10:00 AM',
        status: 'pending',
        notes: 'I would like to discuss anxiety management techniques.'
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Sara Mohammed',
        userEmail: 'sara@example.com',
        sessionType: 'phone',
        requestedDate: new Date(Date.now() + 172800000), // day after tomorrow
        requestedTime: '2:00 PM',
        status: 'pending',
        notes: 'Need guidance on work-life balance.'
      },
      {
        id: '3',
        userId: 'user3',
        userName: 'Khalid Ibrahim',
        userEmail: 'khalid@example.com',
        sessionType: 'video',
        requestedDate: new Date(Date.now() + 259200000), // 3 days from now
        requestedTime: '11:30 AM',
        status: 'pending'
      }
    ];
    
    setSessionRequests(mockRequests);
    // Store in localStorage for persistence
    localStorage.setItem('istashr_session_requests', JSON.stringify(mockRequests));
  };
  
  // Load upcoming sessions from localStorage or API
  const loadUpcomingSessions = () => {
    // Try to load from localStorage first
    const storedSessions = localStorage.getItem('istashr_upcoming_sessions');
    if (storedSessions) {
      try {
        const parsedSessions = JSON.parse(storedSessions, (key, value) => {
          if (key === 'date') {
            return new Date(value);
          }
          return value;
        });
        setUpcomingSessions(parsedSessions);
        return;
      } catch (error) {
        console.error('Failed to parse stored upcoming sessions:', error);
      }
    }
    
    // Fall back to mock data
    const mockSessions: UpcomingSession[] = [
      {
        id: '101',
        userId: 'user4',
        userName: 'Fatima Zahra',
        sessionType: 'video',
        date: new Date(Date.now() + 86400000), // tomorrow
        time: '9:00 AM',
        duration: 60,
        status: 'scheduled'
      },
      {
        id: '102',
        userId: 'user5',
        userName: 'Omar Yusuf',
        sessionType: 'phone',
        date: new Date(Date.now() + 172800000), // day after tomorrow
        time: '3:30 PM',
        duration: 45,
        status: 'scheduled'
      }
    ];
    
    setUpcomingSessions(mockSessions);
    // Store in localStorage for persistence
    localStorage.setItem('istashr_upcoming_sessions', JSON.stringify(mockSessions));
  };
  
  // Load messages from localStorage or API
  const loadMessages = () => {
    // Try to load from localStorage first
    const storedMessages = localStorage.getItem('istashr_counsellor_messages');
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages, (key, value) => {
          if (key === 'timestamp') {
            return new Date(value);
          }
          return value;
        });
        setMessages(parsedMessages);
        return;
      } catch (error) {
        console.error('Failed to parse stored messages:', error);
      }
    }
    
    // Fall back to mock data
    const mockMessages: Message[] = [
      {
        id: 'm1',
        senderId: 'user1',
        senderName: 'Ahmed Ali',
        content: 'Hello, I have a question about our upcoming session.',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        id: 'm2',
        senderId: 'user2',
        senderName: 'Sara Mohammed',
        content: 'Thank you for your help in our last session!',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      }
    ];
    
    setMessages(mockMessages);
    // Store in localStorage for persistence
    localStorage.setItem('istashr_counsellor_messages', JSON.stringify(mockMessages));
  };
  
  // Handle logout
  const handleLogout = () => {
    authService.logout();
    router.push('/auth/login');
  };
  
  // Handle approving a session request
  const handleApproveRequest = (requestId: string) => {
    setSessionRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === requestId 
          ? { ...req, status: 'approved' } 
          : req
      )
    );
    
    // In a real app, you would also add this to upcoming sessions
    const approvedRequest = sessionRequests.find(req => req.id === requestId);
    if (approvedRequest) {
      const newSession: UpcomingSession = {
        id: `s-${approvedRequest.id}`,
        userId: approvedRequest.userId,
        userName: approvedRequest.userName,
        sessionType: approvedRequest.sessionType,
        date: approvedRequest.requestedDate,
        time: approvedRequest.requestedTime,
        duration: 60, // default duration
        status: 'scheduled'
      };
      
      setUpcomingSessions(prev => [...prev, newSession]);
      
      // Update localStorage
      localStorage.setItem('istashr_session_requests', JSON.stringify(
        sessionRequests.map(req => 
          req.id === requestId 
            ? { ...req, status: 'approved' } 
            : req
        )
      ));
      
      localStorage.setItem('istashr_upcoming_sessions', JSON.stringify([...upcomingSessions, newSession]));
    }
    
    alert('Session request approved successfully!');
  };
  
  // Handle rejecting a session request
  const handleRejectRequest = (requestId: string) => {
    setSessionRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === requestId 
          ? { ...req, status: 'rejected' } 
          : req
      )
    );
    
    alert('Session request rejected.');
  };
  
  // Handle cancelling a session
  const handleCancelSession = (sessionId: string) => {
    setUpcomingSessions(prevSessions => 
      prevSessions.map(session => 
        session.id === sessionId 
          ? { ...session, status: 'cancelled' } 
          : session
      )
    );
    
    alert('Session cancelled successfully.');
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                استشر
              </Link>
              <span className="ml-2 text-gray-600">| Counsellor Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-sm text-gray-700 hover:text-blue-600">
                Back to Home
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                leftIcon={<FaSignOutAlt />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`w-full flex items-center px-3 py-2 rounded-md ${
                    activeTab === 'requests' 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FaClipboardList className="mr-3 h-5 w-5" />
                  Session Requests
                  {sessionRequests.filter(r => r.status === 'pending').length > 0 && (
                    <span className="ml-auto bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                      {sessionRequests.filter(r => r.status === 'pending').length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`w-full flex items-center px-3 py-2 rounded-md ${
                    activeTab === 'upcoming' 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FaCalendarAlt className="mr-3 h-5 w-5" />
                  Upcoming Sessions
                  {upcomingSessions.filter(s => s.status === 'scheduled').length > 0 && (
                    <span className="ml-auto bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                      {upcomingSessions.filter(s => s.status === 'scheduled').length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`w-full flex items-center px-3 py-2 rounded-md ${
                    activeTab === 'messages' 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FaComments className="mr-3 h-5 w-5" />
                  Messages
                  {messages.filter(m => !m.isRead).length > 0 && (
                    <span className="ml-auto bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                      {messages.filter(m => !m.isRead).length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-3 py-2 rounded-md ${
                    activeTab === 'profile' 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FaUserCog className="mr-3 h-5 w-5" />
                  Profile Settings
                </button>
                <Link
                  href="/settings"
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <FaCog className="mr-3 h-5 w-5" />
                  Account Settings
                </Link>
                <Link
                  href="/sessions/history"
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <FaHistory className="mr-3 h-5 w-5" />
                  Session History
                </Link>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Session Requests Tab */}
            {activeTab === 'requests' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Session Requests</h1>
                  <p className="text-gray-600">Manage incoming session requests from users.</p>
                </div>
                
                {sessionRequests.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <p className="text-gray-500">No session requests at the moment.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sessionRequests.map(request => (
                      <Card key={request.id}>
                        <CardHeader>
                          <CardTitle className="flex justify-between items-center">
                            <span>Request from {request.userName}</span>
                            <span className={`text-sm px-3 py-1 rounded-full ${
                              request.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : request.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Session Type:</span>
                              <span className="font-medium">{request.sessionType.charAt(0).toUpperCase() + request.sessionType.slice(1)} Session</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Requested Date:</span>
                              <span className="font-medium">{formatDate(request.requestedDate)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Requested Time:</span>
                              <span className="font-medium">{request.requestedTime}</span>
                            </div>
                            {request.notes && (
                              <div className="mt-3">
                                <span className="text-gray-500 block mb-1">Notes:</span>
                                <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{request.notes}</p>
                              </div>
                            )}
                            
                            {request.status === 'pending' && (
                              <div className="flex space-x-3 mt-4">
                                <Button 
                                  onClick={() => handleApproveRequest(request.id)}
                                  className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                  <FaCheckCircle className="mr-2" /> Approve
                                </Button>
                                <Button 
                                  onClick={() => handleRejectRequest(request.id)}
                                  className="flex-1 bg-red-600 hover:bg-red-700"
                                >
                                  <FaTimesCircle className="mr-2" /> Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Upcoming Sessions Tab */}
            {activeTab === 'upcoming' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Upcoming Sessions</h1>
                  <p className="text-gray-600">View and manage your scheduled sessions.</p>
                </div>
                
                {upcomingSessions.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <p className="text-gray-500">No upcoming sessions scheduled.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingSessions.map(session => (
                      <Card key={session.id}>
                        <CardHeader>
                          <CardTitle className="flex justify-between items-center">
                            <span>Session with {session.userName}</span>
                            <span className={`text-sm px-3 py-1 rounded-full ${
                              session.status === 'scheduled' 
                                ? 'bg-blue-100 text-blue-800' 
                                : session.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Session Type:</span>
                              <span className="font-medium">{session.sessionType.charAt(0).toUpperCase() + session.sessionType.slice(1)} Session</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Date:</span>
                              <span className="font-medium">{formatDate(session.date)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Time:</span>
                              <span className="font-medium">{session.time}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Duration:</span>
                              <span className="font-medium">{session.duration} minutes</span>
                            </div>
                            
                            {session.status === 'scheduled' && (
                              <div className="flex space-x-3 mt-4">
                                <Button 
                                  className="flex-1"
                                >
                                  <FaCalendarAlt className="mr-2" /> Start Session
                                </Button>
                                <Button 
                                  onClick={() => handleCancelSession(session.id)}
                                  className="flex-1 bg-red-600 hover:bg-red-700"
                                >
                                  <FaTimesCircle className="mr-2" /> Cancel
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                  <p className="text-gray-600">Communicate with your clients.</p>
                </div>
                
                {messages.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <p className="text-gray-500">No messages at the moment.</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="divide-y divide-gray-200">
                      {messages.map(message => (
                        <div 
                          key={message.id} 
                          className={`p-4 hover:bg-gray-50 cursor-pointer ${!message.isRead ? 'bg-blue-50' : ''}`}
                          onClick={() => {
                            setMessages(prev => 
                              prev.map(m => 
                                m.id === message.id 
                                  ? { ...m, isRead: true } 
                                  : m
                              )
                            );
                          }}
                        >
                          <div className="flex justify-between">
                            <span className="font-medium">{message.senderName}</span>
                            <span className="text-sm text-gray-500">
                              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-gray-700 mt-1">{message.content}</p>
                          {!message.isRead && (
                            <span className="inline-block mt-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Profile Settings Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                  <p className="text-gray-600">Manage your counsellor profile information.</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    alert('Profile updated successfully!');
                  }}>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Professional Title
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g. Licensed Therapist, Counsellor, Psychologist"
                          defaultValue="Licensed Therapist"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Specializations
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g. Anxiety, Depression, Relationships"
                          defaultValue="Anxiety, Depression, Family Counselling"
                        />
                        <p className="mt-1 text-sm text-gray-500">Separate with commas</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Tell clients about yourself and your approach"
                          defaultValue="I am a licensed therapist with over 10 years of experience helping individuals overcome anxiety and depression. My approach is client-centered and focuses on practical solutions."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Education & Credentials
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="List your degrees, certifications, and credentials"
                          defaultValue="Ph.D. in Clinical Psychology, University of Cairo (2010)
Licensed Professional Counsellor
Certified in Cognitive Behavioral Therapy"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Languages Spoken
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g. Arabic, English, French"
                          defaultValue="Arabic, English"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Session Rates
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-500 mb-1">
                              Video Session (60 min)
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              defaultValue="200 SAR"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-500 mb-1">
                              Phone Session (45 min)
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              defaultValue="150 SAR"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Availability
                        </label>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                            <div key={day} className="flex items-center">
                              <input
                                id={`day-${day}`}
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                defaultChecked={['Monday', 'Tuesday', 'Wednesday', 'Thursday'].includes(day)}
                              />
                              <label htmlFor={`day-${day}`} className="ml-2 block text-sm text-gray-900">
                                {day}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button type="submit">
                          Save Profile
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 