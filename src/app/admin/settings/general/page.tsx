'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCog, FaSignOutAlt, FaSave, FaGlobe, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { authService } from '@/lib/auth';
import { UserRole } from '@/types';

export default function AdminGeneralSettings() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: UserRole } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form states
  const [siteName, setSiteName] = useState('استشر - Istashr');
  const [siteDescription, setSiteDescription] = useState('Online counselling and consultation platform');
  const [contactEmail, setContactEmail] = useState('support@istashr.com');
  const [contactPhone, setContactPhone] = useState('+966 50 123 4567');
  const [address, setAddress] = useState('Riyadh, Saudi Arabia');
  const [language, setLanguage] = useState('ar');
  const [facebookUrl, setFacebookUrl] = useState('https://facebook.com/istashr');
  const [twitterUrl, setTwitterUrl] = useState('https://twitter.com/istashr');
  const [instagramUrl, setInstagramUrl] = useState('https://instagram.com/istashr');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/company/istashr');
  
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
        siteName,
        siteDescription,
        contactEmail,
        contactPhone,
        address,
        language,
        socialMedia: {
          facebook: facebookUrl,
          twitter: twitterUrl,
          instagram: instagramUrl,
          linkedin: linkedinUrl
        }
      };
      
      localStorage.setItem('istashr_site_settings', JSON.stringify(settings));
      
      setIsSaving(false);
      alert('Settings saved successfully!');
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
            <h1 className="text-2xl font-bold text-gray-900">General Settings</h1>
            <p className="mt-1 text-sm text-gray-500">
              Configure general website settings
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
                    className="px-4 py-3 border-l-4 border-blue-600 bg-blue-50 text-blue-700 font-medium"
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
                    className="px-4 py-3 border-l-4 border-transparent hover:bg-gray-50 text-gray-700"
                  >
                    Privacy Settings
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Settings Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Site Information */}
            <Card>
              <CardHeader>
                <CardTitle>Site Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                      Site Name
                    </label>
                    <Input
                      id="siteName"
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      placeholder="Enter site name"
                      fullWidth
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Site Description
                    </label>
                    <textarea
                      id="siteDescription"
                      value={siteDescription}
                      onChange={(e) => setSiteDescription(e.target.value)}
                      placeholder="Enter site description"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                      Default Language
                    </label>
                    <select
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="ar">Arabic</option>
                      <option value="en">English</option>
                      <option value="both">Bilingual (Arabic & English)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email
                    </label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Enter contact email"
                      leftIcon={<FaEnvelope />}
                      fullWidth
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Phone
                    </label>
                    <Input
                      id="contactPhone"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="Enter contact phone"
                      leftIcon={<FaPhone />}
                      fullWidth
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter address"
                      leftIcon={<FaMapMarkerAlt />}
                      fullWidth
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="facebookUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      Facebook URL
                    </label>
                    <Input
                      id="facebookUrl"
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                      placeholder="Enter Facebook URL"
                      leftIcon={<FaFacebook />}
                      fullWidth
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="twitterUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter URL
                    </label>
                    <Input
                      id="twitterUrl"
                      value={twitterUrl}
                      onChange={(e) => setTwitterUrl(e.target.value)}
                      placeholder="Enter Twitter URL"
                      leftIcon={<FaTwitter />}
                      fullWidth
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="instagramUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      Instagram URL
                    </label>
                    <Input
                      id="instagramUrl"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      placeholder="Enter Instagram URL"
                      leftIcon={<FaInstagram />}
                      fullWidth
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn URL
                    </label>
                    <Input
                      id="linkedinUrl"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="Enter LinkedIn URL"
                      leftIcon={<FaLinkedin />}
                      fullWidth
                    />
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