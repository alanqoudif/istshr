'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUser, FaLock, FaBell, FaShieldAlt, FaCalendarAlt, FaHistory, FaUsers, FaCog, FaArrowLeft } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { authService } from '@/lib/auth';
import { UserRole } from '@/types';

export default function SettingsPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('account');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [privateModeEnabled, setPrivateModeEnabled] = useState(true);
  const [autoDeleteMessages, setAutoDeleteMessages] = useState(true);
  const [messageExpiryHours, setMessageExpiryHours] = useState(24);
  
  // Check if user is authenticated
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }
    
    setCurrentUser(user);
    setName(user.name || '');
    setEmail(user.email || '');
    setIsLoading(false);
  }, [router]);
  
  // Handle account form submission
  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    
    // Update user profile
    if (currentUser) {
      try {
        // In a real app, this would be an API call
        // For now, we'll just update the user in localStorage
        const updatedUser = {
          ...currentUser,
          name,
          email
        };
        
        authService.setCurrentUser(updatedUser);
        setSuccessMessage('Profile updated successfully');
      } catch (error) {
        console.error('Failed to update profile:', error);
        setErrorMessage('Failed to update profile. Please try again.');
      }
    }
  };
  
  // Handle password form submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters');
      return;
    }
    
    // In a real app, this would verify the current password
    // For now, we'll just show a success message
    setSuccessMessage('Password updated successfully');
    
    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  // Handle notifications form submission
  const handleNotificationsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('Notification preferences updated successfully');
  };
  
  // Handle privacy form submission
  const handlePrivacySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('Privacy settings updated successfully');
  };
  
  // Handle navigation back to dashboard
  const handleBackToDashboard = () => {
    if (currentUser?.role === UserRole.ADMIN) {
      router.push('/admin/dashboard');
    } else if (currentUser?.role === UserRole.COUNSELLOR) {
      router.push('/counsellor/dashboard');
    } else {
      router.push('/dashboard');
    }
  };
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                استشر
              </Link>
              <span className="ml-2 text-gray-600">| Settings</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleBackToDashboard}
                className="flex items-center text-sm text-gray-700 hover:text-blue-600"
              >
                <FaArrowLeft className="mr-1" />
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <nav className="flex flex-col">
                <button
                  onClick={() => setActiveTab('account')}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === 'account'
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <FaUser className={`mr-3 h-5 w-5 ${activeTab === 'account' ? 'text-blue-500' : 'text-gray-400'}`} />
                  Account Information
                </button>
                
                <button
                  onClick={() => setActiveTab('password')}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === 'password'
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <FaLock className={`mr-3 h-5 w-5 ${activeTab === 'password' ? 'text-blue-500' : 'text-gray-400'}`} />
                  Password
                </button>
                
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === 'notifications'
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <FaBell className={`mr-3 h-5 w-5 ${activeTab === 'notifications' ? 'text-blue-500' : 'text-gray-400'}`} />
                  Notifications
                </button>
                
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === 'privacy'
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <FaShieldAlt className={`mr-3 h-5 w-5 ${activeTab === 'privacy' ? 'text-blue-500' : 'text-gray-400'}`} />
                  Privacy
                </button>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Account Information */}
            {activeTab === 'account' && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAccountSubmit} className="space-y-6">
                    <div>
                      <Input
                        label="Full Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                      />
                    </div>
                    
                    <div>
                      <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                      />
                    </div>
                    
                    <div>
                      <Button type="submit">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {/* Password */}
            {activeTab === 'password' && (
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div>
                      <Input
                        label="Current Password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        fullWidth
                      />
                    </div>
                    
                    <div>
                      <Input
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        fullWidth
                      />
                    </div>
                    
                    <div>
                      <Input
                        label="Confirm New Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                      />
                    </div>
                    
                    <div>
                      <Button type="submit">
                        Update Password
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {/* Notifications */}
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNotificationsSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Enable Notifications</h3>
                          <p className="text-sm text-gray-500">Receive notifications about your account activity</p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="notifications-enabled"
                            checked={notificationsEnabled}
                            onChange={(e) => setNotificationsEnabled(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-500">Receive email notifications</p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="email-notifications"
                            checked={emailNotifications}
                            onChange={(e) => setEmailNotifications(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Button type="submit">
                        Save Preferences
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {/* Privacy */}
            {activeTab === 'privacy' && (
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePrivacySubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Private Mode</h3>
                          <p className="text-sm text-gray-500">Enable private mode for enhanced privacy</p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="private-mode"
                            checked={privateModeEnabled}
                            onChange={(e) => setPrivateModeEnabled(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Auto-Delete Messages</h3>
                          <p className="text-sm text-gray-500">Automatically delete messages after a period of time</p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="auto-delete"
                            checked={autoDeleteMessages}
                            onChange={(e) => setAutoDeleteMessages(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                      </div>
                      
                      {autoDeleteMessages && (
                        <div>
                          <label htmlFor="expiry-hours" className="block text-sm font-medium text-gray-700">
                            Message Expiry (Hours)
                          </label>
                          <select
                            id="expiry-hours"
                            value={messageExpiryHours}
                            onChange={(e) => setMessageExpiryHours(Number(e.target.value))}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          >
                            <option value={1}>1 hour</option>
                            <option value={6}>6 hours</option>
                            <option value={12}>12 hours</option>
                            <option value={24}>24 hours</option>
                            <option value={48}>48 hours</option>
                            <option value={72}>72 hours</option>
                          </select>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <Button type="submit">
                        Save Privacy Settings
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 