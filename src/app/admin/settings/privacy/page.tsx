'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaSignOutAlt, FaSave, FaShieldAlt, FaLock, FaUserSecret, FaCookieBite, FaFileAlt } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { authService } from '@/lib/auth';
import { UserRole } from '@/types';

export default function AdminPrivacySettings() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: UserRole } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form states
  const [dataRetentionPeriod, setDataRetentionPeriod] = useState(12);
  const [anonymousSessionsEnabled, setAnonymousSessionsEnabled] = useState(true);
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState('/privacy-policy');
  const [termsOfServiceUrl, setTermsOfServiceUrl] = useState('/terms-of-service');
  const [cookieConsentEnabled, setCookieConsentEnabled] = useState(true);
  const [dataEncryptionEnabled, setDataEncryptionEnabled] = useState(true);
  const [twoFactorAuthRequired, setTwoFactorAuthRequired] = useState(false);
  const [sessionRecordingEnabled, setSessionRecordingEnabled] = useState(false);
  const [gdprCompliant, setGdprCompliant] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated and is admin
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== UserRole.ADMIN) {
      router.push('/auth/login');
      return;
    }
    
    setUser(currentUser);
    setIsLoading(false);
  }, [router]);
  
  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      // Save to localStorage for demo purposes
      const settings = {
        dataRetentionPeriod,
        anonymousSessionsEnabled,
        privacyPolicyUrl,
        termsOfServiceUrl,
        cookieConsentEnabled,
        dataEncryptionEnabled,
        twoFactorAuthRequired,
        sessionRecordingEnabled,
        gdprCompliant
      };
      
      localStorage.setItem('istashr_privacy_settings', JSON.stringify(settings));
      
      setIsSaving(false);
      alert('Privacy settings saved successfully!');
    }, 1000);
  };
  
  const handleLogout = () => {
    authService.logout();
    router.push('/auth/login');
  };
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Privacy Settings</h1>
            <p className="mt-1 text-sm text-gray-500">
              Configure privacy and data protection settings
            </p>
          </div>
          <Button 
            leftIcon={<FaSave />}
            onClick={handleSaveSettings}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin Navigation Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <Link 
                    href="/admin/settings/general" 
                    className="px-4 py-3 border-l-4 border-transparent hover:bg-gray-50 text-gray-700"
                  >
                    General Settings
                  </Link>
                  <Link 
                    href="/admin/settings/users" 
                    className="px-4 py-3 border-l-4 border-transparent hover:bg-gray-50 text-gray-700"
                  >
                    User Management
                  </Link>
                  <Link 
                    href="/admin/settings/counsellors" 
                    className="px-4 py-3 border-l-4 border-transparent hover:bg-gray-50 text-gray-700"
                  >
                    Counsellor Management
                  </Link>
                  <Link 
                    href="/admin/settings/sessions" 
                    className="px-4 py-3 border-l-4 border-transparent hover:bg-gray-50 text-gray-700"
                  >
                    Session Settings
                  </Link>
                  <Link 
                    href="/admin/settings/payments" 
                    className="px-4 py-3 border-l-4 border-transparent hover:bg-gray-50 text-gray-700"
                  >
                    Payment Settings
                  </Link>
                  <Link 
                    href="/admin/settings/privacy" 
                    className="px-4 py-3 border-l-4 border-blue-600 bg-blue-50 text-blue-700 font-medium"
                  >
                    Privacy Settings
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Settings Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Data Protection */}
            <Card>
              <CardHeader>
                <CardTitle>Data Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="dataRetentionPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                      Data Retention Period (months)
                    </label>
                    <Input
                      id="dataRetentionPeriod"
                      type="number"
                      value={dataRetentionPeriod}
                      onChange={(e) => setDataRetentionPeriod(parseInt(e.target.value))}
                      min={1}
                      max={60}
                      leftIcon={<FaShieldAlt />}
                      fullWidth
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      How long user data is kept after account deletion
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="dataEncryptionEnabled"
                      type="checkbox"
                      checked={dataEncryptionEnabled}
                      onChange={(e) => setDataEncryptionEnabled(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="dataEncryptionEnabled" className="ml-2 block text-sm text-gray-700">
                      Enable End-to-End Encryption for Messages
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="gdprCompliant"
                      type="checkbox"
                      checked={gdprCompliant}
                      onChange={(e) => setGdprCompliant(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="gdprCompliant" className="ml-2 block text-sm text-gray-700">
                      GDPR Compliance Mode
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* User Privacy */}
            <Card>
              <CardHeader>
                <CardTitle>User Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="anonymousSessionsEnabled"
                      type="checkbox"
                      checked={anonymousSessionsEnabled}
                      onChange={(e) => setAnonymousSessionsEnabled(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="anonymousSessionsEnabled" className="ml-2 block text-sm text-gray-700">
                      Allow Anonymous Sessions
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="sessionRecordingEnabled"
                      type="checkbox"
                      checked={sessionRecordingEnabled}
                      onChange={(e) => setSessionRecordingEnabled(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="sessionRecordingEnabled" className="ml-2 block text-sm text-gray-700">
                      Allow Session Recording (with user consent)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="cookieConsentEnabled"
                      type="checkbox"
                      checked={cookieConsentEnabled}
                      onChange={(e) => setCookieConsentEnabled(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="cookieConsentEnabled" className="ml-2 block text-sm text-gray-700">
                      Enable Cookie Consent Banner
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="twoFactorAuthRequired"
                      type="checkbox"
                      checked={twoFactorAuthRequired}
                      onChange={(e) => setTwoFactorAuthRequired(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="twoFactorAuthRequired" className="ml-2 block text-sm text-gray-700">
                      Require Two-Factor Authentication for Counsellors
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Legal Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Legal Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="privacyPolicyUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      Privacy Policy URL
                    </label>
                    <Input
                      id="privacyPolicyUrl"
                      value={privacyPolicyUrl}
                      onChange={(e) => setPrivacyPolicyUrl(e.target.value)}
                      placeholder="Enter privacy policy URL"
                      leftIcon={<FaFileAlt />}
                      fullWidth
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="termsOfServiceUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      Terms of Service URL
                    </label>
                    <Input
                      id="termsOfServiceUrl"
                      value={termsOfServiceUrl}
                      onChange={(e) => setTermsOfServiceUrl(e.target.value)}
                      placeholder="Enter terms of service URL"
                      leftIcon={<FaFileAlt />}
                      fullWidth
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      variant="outline"
                      onClick={() => alert('Edit Privacy Policy functionality will be implemented soon')}
                    >
                      Edit Privacy Policy
                    </Button>
                    <Button 
                      variant="outline"
                      className="ml-4"
                      onClick={() => alert('Edit Terms of Service functionality will be implemented soon')}
                    >
                      Edit Terms of Service
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 