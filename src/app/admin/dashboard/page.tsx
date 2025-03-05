'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUsers, FaCalendarAlt, FaComments, FaChartLine, FaCog, FaSignOutAlt, FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { authService } from '@/lib/auth';
import { UserRole, SessionStatus } from '@/types';

// Session interface for admin dashboard
interface AdminSession {
  id: string;
  userId: string;
  userName: string;
  counsellorId: string;
  counsellorName: string;
  startTime: Date;
  endTime: Date;
  status: SessionStatus;
  isAnonymous: boolean;
  notes?: string;
  rating?: number;
  feedback?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: UserRole } | null>(null);
  const [showSessionsModal, setShowSessionsModal] = useState(false);
  const [sessions, setSessions] = useState<AdminSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated and is admin
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== UserRole.ADMIN) {
      router.push('/auth/login');
      return;
    }
    
    setUser(currentUser);
  }, [router]);
  
  const handleLogout = () => {
    authService.logout();
    router.push('/auth/login');
  };

  const handleViewAllUsers = () => {
    // Placeholder for future implementation
    alert('View All Users functionality will be implemented soon');
  };

  const handleAddNewUser = () => {
    // Placeholder for future implementation
    alert('Add New User functionality will be implemented soon');
  };

  const handleManageRoles = () => {
    // Placeholder for future implementation
    alert('Manage Roles functionality will be implemented soon');
  };

  const handleViewAllSessions = () => {
    setIsLoading(true);
    
    // Load sessions from localStorage
    const counsellorSessions = localStorage.getItem('istashr_upcoming_sessions');
    let parsedSessions: any[] = [];
    
    if (counsellorSessions) {
      try {
        parsedSessions = JSON.parse(counsellorSessions, (key, value) => {
          if (key === 'date') {
            return new Date(value);
          }
          return value;
        });
      } catch (error) {
        console.error('Failed to parse sessions:', error);
      }
    }
    
    // Convert to admin session format
    const adminSessions: AdminSession[] = parsedSessions.map(session => ({
      id: session.id,
      userId: session.userId,
      userName: session.userName,
      counsellorId: 'counsellor-1', // Mock data
      counsellorName: 'Dr. Mohammed Al-Faisal', // Mock data
      startTime: new Date(session.date.getTime() + getTimeInMinutes(session.time) * 60 * 1000),
      endTime: new Date(session.date.getTime() + (getTimeInMinutes(session.time) + session.duration) * 60 * 1000),
      status: session.status === 'scheduled' ? SessionStatus.SCHEDULED : 
              session.status === 'completed' ? SessionStatus.COMPLETED : 
              session.status === 'cancelled' ? SessionStatus.CANCELLED : SessionStatus.SCHEDULED,
      isAnonymous: false,
      rating: Math.floor(Math.random() * 5) + 1, // Random rating 1-5
      feedback: session.status === 'completed' ? 'Great session!' : undefined
    }));
    
    // Add some mock sessions if none exist
    if (adminSessions.length === 0) {
      const mockSessions: AdminSession[] = [
        {
          id: 'session-1',
          userId: 'user-1',
          userName: 'Ahmed Ali',
          counsellorId: 'counsellor-1',
          counsellorName: 'Dr. Mohammed Al-Faisal',
          startTime: new Date(Date.now() + 86400000), // tomorrow
          endTime: new Date(Date.now() + 86400000 + 3600000), // 1 hour later
          status: SessionStatus.SCHEDULED,
          isAnonymous: false
        },
        {
          id: 'session-2',
          userId: 'user-2',
          userName: 'Sara Mohammed',
          counsellorId: 'counsellor-2',
          counsellorName: 'Dr. Fatima Zahra',
          startTime: new Date(Date.now() - 86400000), // yesterday
          endTime: new Date(Date.now() - 86400000 + 3600000), // 1 hour later
          status: SessionStatus.COMPLETED,
          isAnonymous: false,
          rating: 5,
          feedback: 'Very helpful session!'
        },
        {
          id: 'session-3',
          userId: 'user-3',
          userName: 'Anonymous User',
          counsellorId: 'counsellor-1',
          counsellorName: 'Dr. Mohammed Al-Faisal',
          startTime: new Date(Date.now() - 172800000), // 2 days ago
          endTime: new Date(Date.now() - 172800000 + 3600000), // 1 hour later
          status: SessionStatus.CANCELLED,
          isAnonymous: true
        }
      ];
      
      adminSessions.push(...mockSessions);
    }
    
    setSessions(adminSessions);
    setIsLoading(false);
    setShowSessionsModal(true);
  };
  
  // Helper function to convert time string to minutes
  const getTimeInMinutes = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let totalMinutes = hours * 60 + minutes;
    if (period === 'PM' && hours < 12) {
      totalMinutes += 12 * 60;
    } else if (period === 'AM' && hours === 12) {
      totalMinutes -= 12 * 60;
    }
    
    return totalMinutes;
  };
  
  // Format date for display
  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleScheduleSession = () => {
    // Placeholder for future implementation
    alert('Schedule Session functionality will be implemented soon');
  };

  const handleSessionReports = () => {
    // Placeholder for future implementation
    alert('Session Reports functionality will be implemented soon');
  };

  const handleGeneralSettings = () => {
    // Placeholder for future implementation
    alert('General Settings functionality will be implemented soon');
  };

  const handlePrivacySettings = () => {
    // Placeholder for future implementation
    alert('Privacy Settings functionality will be implemented soon');
  };

  const handlePaymentSettings = () => {
    // Placeholder for future implementation
    alert('Payment Settings functionality will be implemented soon');
  };
  
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header - Separate from main navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                استشر
              </Link>
              <span className="ml-2 text-gray-600">| Admin Panel</span>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage users, sessions, and platform settings
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <FaUsers className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Users</h3>
                  <p className="text-2xl font-semibold text-gray-700">125</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <FaCalendarAlt className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Sessions</h3>
                  <p className="text-2xl font-semibold text-gray-700">48</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <FaComments className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Posts</h3>
                  <p className="text-2xl font-semibold text-gray-700">87</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <FaChartLine className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Revenue</h3>
                  <p className="text-2xl font-semibold text-gray-700">12,450 SAR</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FaUsers className="mr-2 text-blue-600" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Manage users, roles, and permissions
              </p>
              <div className="space-y-2">
                <Button variant="outline" fullWidth onClick={handleViewAllUsers}>View All Users</Button>
                <Button variant="outline" fullWidth onClick={handleAddNewUser}>Add New User</Button>
                <Button variant="outline" fullWidth onClick={handleManageRoles}>Manage Roles</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FaCalendarAlt className="mr-2 text-green-600" />
                Session Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Monitor and manage counselling sessions
              </p>
              <div className="space-y-2">
                <Button variant="outline" fullWidth onClick={handleViewAllSessions}>View All Sessions</Button>
                <Button variant="outline" fullWidth onClick={handleScheduleSession}>Schedule Session</Button>
                <Button variant="outline" fullWidth onClick={handleSessionReports}>Session Reports</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FaCog className="mr-2 text-gray-600" />
                Platform Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Configure platform settings and features
              </p>
              <div className="space-y-2">
                <Button variant="outline" fullWidth onClick={handleGeneralSettings}>General Settings</Button>
                <Button variant="outline" fullWidth onClick={handlePrivacySettings}>Privacy Settings</Button>
                <Button variant="outline" fullWidth onClick={handlePaymentSettings}>Payment Settings</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} استشر Admin Panel. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Sessions Modal */}
      {showSessionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">All Sessions</h2>
              <button 
                onClick={() => setShowSessionsModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              {isLoading ? (
                <div className="text-center py-8">Loading sessions...</div>
              ) : sessions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No sessions found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Counsellor
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Start Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          End Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sessions.map((session) => (
                        <tr key={session.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {session.isAnonymous ? 'Anonymous User' : session.userName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{session.counsellorName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatDateTime(session.startTime)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatDateTime(session.endTime)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${session.status === SessionStatus.SCHEDULED ? 'bg-blue-100 text-blue-800' : 
                                session.status === SessionStatus.COMPLETED ? 'bg-green-100 text-green-800' : 
                                session.status === SessionStatus.CANCELLED ? 'bg-red-100 text-red-800' : 
                                'bg-gray-100 text-gray-800'}`}>
                              {session.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {session.rating ? `${session.rating}/5` : '-'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <FaEye className="h-4 w-4" />
                              </button>
                              {session.status === SessionStatus.SCHEDULED && (
                                <>
                                  <button className="text-green-600 hover:text-green-900">
                                    <FaCheck className="h-4 w-4" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    <FaTimes className="h-4 w-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 