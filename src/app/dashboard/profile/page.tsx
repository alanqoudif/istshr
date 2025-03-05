'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaEdit, FaArrowLeft } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { authService } from '@/lib/auth';
import { UserRole } from '@/types';

export default function UserProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/auth/login');
      return;
    }
    
    // Fetch user profile data
    setIsLoading(true);
    
    // Mock user data
    const mockUserData = {
      id: 'user-123',
      name: currentUser.name || 'Ahmed Mohammed',
      email: currentUser.email || 'ahmed@example.com',
      phone: '+966 50 123 4567',
      role: currentUser.role || UserRole.USER,
      joinedDate: new Date('2023-01-15'),
      sessions: {
        total: 8,
        upcoming: 2,
        completed: 6
      },
      preferences: {
        language: 'Arabic',
        notifications: true,
        anonymousMode: false
      }
    };
    
    setUser(mockUserData);
    setIsLoading(false);
  }, [router]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Error loading profile</p>
          <Button 
            className="mt-4"
            onClick={() => router.push('/dashboard')}
            leftIcon={<FaArrowLeft />}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                استشر
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/counsellors"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Find Experts
              </Link>
              <Link
                href="/community"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Community
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl mb-4">
                  {user.name.charAt(0)}
                </div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Member since {user.joinedDate.toLocaleDateString()}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaEnvelope className="text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaPhone className="text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaUser className="text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Account Type</p>
                    <p className="font-medium">{user.role}</p>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6"
                leftIcon={<FaEdit />}
                onClick={() => alert('Edit profile functionality will be implemented soon')}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
          
          {/* Session History */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Session History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-blue-600">{user.sessions.total}</p>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">{user.sessions.completed}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-yellow-600">{user.sessions.upcoming}</p>
                  <p className="text-sm text-gray-600">Upcoming</p>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h3 className="text-sm font-medium">Recent Sessions</h3>
                </div>
                <div className="divide-y">
                  {[1, 2, 3].map((_, index) => (
                    <div key={`session-${index}`} className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium">Session with Dr. {['Sara Ahmed', 'Mohammed Al-Farsi', 'Layla Mahmoud'][index]}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <FaCalendarAlt className="mr-1" />
                          <span>
                            {new Date(Date.now() - (index + 1) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{['10:00 AM', '2:30 PM', '4:00 PM'][index]}</span>
                        </div>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          index === 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {index === 0 ? 'Upcoming' : 'Completed'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline"
                className="w-full mt-4"
                onClick={() => router.push('/sessions')}
              >
                View All Sessions
              </Button>
            </CardContent>
          </Card>
          
          {/* Preferences */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Language</h3>
                  <p className="text-gray-600 mb-4">Current: <span className="font-medium">{user.preferences.language}</span></p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => alert('Language settings will be implemented soon')}
                  >
                    Change Language
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Notifications</h3>
                  <p className="text-gray-600 mb-4">Status: <span className="font-medium">{user.preferences.notifications ? 'Enabled' : 'Disabled'}</span></p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => alert('Notification settings will be implemented soon')}
                  >
                    Manage Notifications
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Anonymous Mode</h3>
                  <p className="text-gray-600 mb-4">Status: <span className="font-medium">{user.preferences.anonymousMode ? 'Enabled' : 'Disabled'}</span></p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => alert('Privacy settings will be implemented soon')}
                  >
                    Privacy Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 