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
  FaHistory,
  FaStar,
  FaDownload,
  FaComments
} from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { authService } from '@/lib/auth';
import { UserRole } from '@/types';

// Types for the session history
interface SessionHistory {
  id: string;
  userId: string;
  userName: string;
  counsellorId: string;
  counsellorName: string;
  sessionType: 'video' | 'phone';
  date: Date;
  time: string;
  duration: number; // in minutes
  status: 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  rating?: number;
  feedback?: string;
}

export default function SessionHistoryPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionHistory, setSessionHistory] = useState<SessionHistory[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  
  // Check if user is authenticated
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }
    
    setCurrentUser(user);
    loadSessionHistory();
    setIsLoading(false);
  }, [router]);
  
  // Load session history from localStorage or API
  const loadSessionHistory = () => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    const mockHistory: SessionHistory[] = [
      {
        id: '1001',
        userId: 'user1',
        userName: 'Ahmed Ali',
        counsellorId: 'counsellor1',
        counsellorName: 'Dr. Sarah Ahmed',
        sessionType: 'video',
        date: new Date(Date.now() - 7 * 86400000), // 7 days ago
        time: '10:00 AM',
        duration: 60,
        status: 'completed',
        notes: 'Discussed anxiety management techniques. Client showed good progress.',
        rating: 5,
        feedback: 'Very helpful session. I learned several techniques to manage my anxiety.'
      },
      {
        id: '1002',
        userId: 'user2',
        userName: 'Sara Mohammed',
        counsellorId: 'counsellor1',
        counsellorName: 'Dr. Sarah Ahmed',
        sessionType: 'phone',
        date: new Date(Date.now() - 14 * 86400000), // 14 days ago
        time: '2:00 PM',
        duration: 45,
        status: 'completed',
        notes: 'Focused on work-life balance strategies.',
        rating: 4,
        feedback: 'Good advice on managing my work schedule.'
      },
      {
        id: '1003',
        userId: 'user3',
        userName: 'Khalid Ibrahim',
        counsellorId: 'counsellor1',
        counsellorName: 'Dr. Sarah Ahmed',
        sessionType: 'video',
        date: new Date(Date.now() - 21 * 86400000), // 21 days ago
        time: '11:30 AM',
        duration: 60,
        status: 'cancelled',
        notes: 'Client cancelled due to personal emergency.'
      },
      {
        id: '1004',
        userId: 'user4',
        userName: 'Fatima Zahra',
        counsellorId: 'counsellor1',
        counsellorName: 'Dr. Sarah Ahmed',
        sessionType: 'video',
        date: new Date(Date.now() - 28 * 86400000), // 28 days ago
        time: '9:00 AM',
        duration: 60,
        status: 'no-show',
        notes: 'Client did not attend the session. Follow-up email sent.'
      }
    ];
    
    setSessionHistory(mockHistory);
  };
  
  // Handle logout
  const handleLogout = () => {
    authService.logout();
    router.push('/auth/login');
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
  
  // Filter sessions based on status and type
  const filteredSessions = sessionHistory.filter(session => {
    const statusMatch = filterStatus === 'all' || session.status === filterStatus;
    const typeMatch = filterType === 'all' || session.sessionType === filterType;
    return statusMatch && typeMatch;
  });
  
  // Render star rating
  const renderRating = (rating?: number) => {
    if (!rating) return null;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
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
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              استشر
            </Link>
            <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Session History
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FaUser className="h-5 w-5 text-blue-600" />
              </div>
              <span className="font-medium">{currentUser?.name}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <FaSignOutAlt className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-1">
                <Link
                  href="/dashboard"
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <FaCalendarAlt className="mr-3 h-5 w-5" />
                  Dashboard
                </Link>
                {currentUser?.role === UserRole.COUNSELLOR && (
                  <Link
                    href="/counsellor/dashboard"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <FaUser className="mr-3 h-5 w-5" />
                    Counsellor Dashboard
                  </Link>
                )}
                {currentUser?.role === UserRole.ADMIN && (
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <FaUser className="mr-3 h-5 w-5" />
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  href="/sessions/history"
                  className="flex items-center px-3 py-2 text-blue-600 bg-blue-50 rounded-md font-medium"
                >
                  <FaHistory className="mr-3 h-5 w-5" />
                  Session History
                </Link>
                <Link
                  href="/community"
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <FaUsers className="mr-3 h-5 w-5" />
                  Community
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <FaCog className="mr-3 h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Session History</h1>
              <p className="text-gray-600">View your past sessions and their details.</p>
            </div>
            
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Status
                  </label>
                  <select
                    id="status-filter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no-show">No Show</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Type
                  </label>
                  <select
                    id="type-filter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="video">Video</option>
                    <option value="phone">Phone</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Session History List */}
            {filteredSessions.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <p className="text-gray-500">No session history found matching your filters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSessions.map(session => (
                  <Card key={session.id}>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>
                          {currentUser?.role === UserRole.COUNSELLOR 
                            ? `Session with ${session.userName}` 
                            : `Session with ${session.counsellorName}`}
                        </span>
                        <span className={`text-sm px-3 py-1 rounded-full ${
                          session.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : session.status === 'cancelled'
                            ? 'bg-yellow-100 text-yellow-800'
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
                        
                        {session.status === 'completed' && (
                          <>
                            {session.rating && (
                              <div className="flex justify-between items-center">
                                <span className="text-gray-500">Rating:</span>
                                {renderRating(session.rating)}
                              </div>
                            )}
                            
                            {session.feedback && (
                              <div className="mt-3">
                                <span className="text-gray-500 block mb-1">Feedback:</span>
                                <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{session.feedback}</p>
                              </div>
                            )}
                          </>
                        )}
                        
                        {currentUser?.role === UserRole.COUNSELLOR && session.notes && (
                          <div className="mt-3">
                            <span className="text-gray-500 block mb-1">Session Notes:</span>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{session.notes}</p>
                          </div>
                        )}
                        
                        <div className="flex space-x-3 mt-4">
                          {session.status === 'completed' && (
                            <>
                              <Button className="flex-1">
                                <FaDownload className="mr-2" /> Download Summary
                              </Button>
                              {!session.feedback && currentUser?.role !== UserRole.COUNSELLOR && (
                                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                                  <FaStar className="mr-2" /> Leave Feedback
                                </Button>
                              )}
                            </>
                          )}
                          
                          {currentUser?.role !== UserRole.COUNSELLOR && (
                            <Button className="flex-1 bg-green-600 hover:bg-green-700">
                              <FaComments className="mr-2" /> Message Counsellor
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 