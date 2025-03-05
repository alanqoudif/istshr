'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaEdit, FaArrowLeft, FaStar, FaCertificate, FaGraduationCap, FaMoneyBillWave } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { authService } from '@/lib/auth';
import { UserRole, CounsellingField } from '@/types';

export default function CounsellorProfilePage() {
  const router = useRouter();
  const [counsellor, setCounsellor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated and is a counsellor
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== UserRole.COUNSELLOR) {
      router.push('/auth/login');
      return;
    }
    
    // Fetch counsellor profile data
    setIsLoading(true);
    
    // Mock counsellor data
    const mockCounsellorData = {
      id: 'counsellor-123',
      userId: currentUser.id || 'user-456',
      name: currentUser.name || 'Dr. Mohammed Al-Faisal',
      email: currentUser.email || 'dr.mohammed@example.com',
      phone: '+966 50 987 6543',
      role: UserRole.COUNSELLOR,
      joinedDate: new Date('2022-06-10'),
      bio: 'Specialized in cognitive behavioral therapy with extensive experience helping clients overcome anxiety, depression, and relationship challenges.',
      specialties: [
        CounsellingField.MENTAL_HEALTH,
        CounsellingField.RELATIONSHIP,
        CounsellingField.PARENTING
      ],
      experience: 12, // years
      education: [
        'Ph.D. in Clinical Psychology, King Saud University',
        'Master of Science in Psychology, University of London'
      ],
      certifications: [
        'Licensed Clinical Psychologist',
        'Certified Cognitive Behavioral Therapist',
        'Family Therapy Certification'
      ],
      hourlyRate: 350,
      rating: 4.9,
      reviewCount: 124,
      sessions: {
        total: 156,
        upcoming: 5,
        completed: 151
      },
      availability: [
        { day: 'Monday', slots: ['9:00 AM - 12:00 PM', '2:00 PM - 5:00 PM'] },
        { day: 'Wednesday', slots: ['10:00 AM - 3:00 PM'] },
        { day: 'Thursday', slots: ['1:00 PM - 6:00 PM'] }
      ]
    };
    
    setCounsellor(mockCounsellorData);
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
  
  if (!counsellor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Error loading profile</p>
          <Button 
            className="mt-4"
            onClick={() => router.push('/counsellor/dashboard')}
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
              <span className="ml-2 text-gray-600">| Counsellor Portal</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/counsellor/dashboard"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/counsellor/sessions"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                My Sessions
              </Link>
              <Link
                href="/counsellor/availability"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Availability
              </Link>
              <Link
                href="/counsellor/profile"
                className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium"
              >
                My Profile
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {counsellor.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link 
            href="/counsellor/dashboard" 
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">My Professional Profile</h1>
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
                  {counsellor.name.charAt(0)}
                </div>
                <h2 className="text-xl font-semibold">{counsellor.name}</h2>
                <div className="flex items-center mt-1">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-medium">{counsellor.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({counsellor.reviewCount} reviews)</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  Member since {counsellor.joinedDate.toLocaleDateString()}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaEnvelope className="text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{counsellor.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaPhone className="text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{counsellor.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaMoneyBillWave className="text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Hourly Rate</p>
                    <p className="font-medium">{counsellor.hourlyRate} SAR</p>
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
          
          {/* Professional Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Bio</h3>
                <p className="text-gray-700">{counsellor.bio}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {counsellor.specialties.map((specialty: string, index: number) => (
                    <span
                      key={`specialty-${index}`}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">
                  <FaGraduationCap className="inline mr-2" />
                  Education
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {counsellor.education.map((edu: string, index: number) => (
                    <li key={`education-${index}`}>{edu}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-2">
                  <FaCertificate className="inline mr-2" />
                  Certifications
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {counsellor.certifications.map((cert: string, index: number) => (
                    <li key={`certification-${index}`}>{cert}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* Session Stats */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Session Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-blue-600">{counsellor.sessions.total}</p>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">{counsellor.sessions.completed}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-yellow-600">{counsellor.sessions.upcoming}</p>
                  <p className="text-sm text-gray-600">Upcoming</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-purple-600">{counsellor.experience}</p>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
              </div>
              
              <Button 
                variant="outline"
                className="w-full mt-4"
                onClick={() => router.push('/counsellor/sessions')}
              >
                View All Sessions
              </Button>
            </CardContent>
          </Card>
          
          {/* Availability */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Current Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {counsellor.availability.map((avail: any, index: number) => (
                  <div key={`availability-${index}`} className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900">{avail.day}</h3>
                    <div className="mt-2 space-y-1">
                      {avail.slots.map((slot: string, slotIndex: number) => (
                        <div key={`slot-${index}-${slotIndex}`} className="flex items-center">
                          <FaCalendarAlt className="text-gray-400 mr-2" />
                          <span className="text-gray-700">{slot}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                className="w-full mt-4"
                onClick={() => router.push('/counsellor/availability')}
              >
                Manage Availability
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 