'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaHistory, FaUsers, FaCog, FaBell, FaSearch } from 'react-icons/fa';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { authService } from '@/lib/auth';
import { AuthUser } from '@/lib/auth';

export default function Dashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const user = authService.getCurrentUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }

    setCurrentUser(user);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Mock data for upcoming sessions
  const upcomingSessions = [
    {
      id: '1',
      counsellorName: 'Dr. Sarah Johnson',
      counsellorImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      date: '2023-06-15',
      time: '10:00 AM',
      duration: '50 minutes',
    },
    {
      id: '2',
      counsellorName: 'Dr. Michael Chen',
      counsellorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: '2023-06-18',
      time: '2:30 PM',
      duration: '60 minutes',
    },
  ];

  // Mock data for recommended experts
  const recommendedExperts = [
    {
      id: '1',
      name: 'Dr. Emily Wilson',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      field: 'Family Counselling',
      rating: 4.9,
      reviewCount: 124,
    },
    {
      id: '2',
      name: 'Dr. Robert Martinez',
      image: 'https://randomuser.me/api/portraits/men/54.jpg',
      field: 'Career Guidance',
      rating: 4.8,
      reviewCount: 98,
    },
    {
      id: '3',
      name: 'Dr. Aisha Khan',
      image: 'https://randomuser.me/api/portraits/women/36.jpg',
      field: 'Mental Health',
      rating: 4.7,
      reviewCount: 156,
    },
  ];

  // Mock data for recent activity
  const recentActivity = [
    {
      id: '1',
      type: 'session',
      description: 'Completed session with Dr. Sarah Johnson',
      date: '2023-06-10',
    },
    {
      id: '2',
      type: 'forum',
      description: 'Posted a question in Career Development forum',
      date: '2023-06-08',
    },
    {
      id: '3',
      type: 'resource',
      description: 'Downloaded "Stress Management Techniques" guide',
      date: '2023-06-05',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              استشر
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <FaBell className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FaUser className="h-5 w-5 text-blue-600" />
              </div>
              <span className="font-medium">{currentUser?.name}</span>
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
                <Link
                  href="/dashboard"
                  className="flex items-center px-3 py-2 text-blue-600 bg-blue-50 rounded-md font-medium"
                >
                  <FaCalendarAlt className="mr-3 h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <FaUser className="mr-3 h-5 w-5" />
                  My Profile
                </Link>
                <Link
                  href="/sessions/history"
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
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
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser?.name}!</h1>
              <p className="text-gray-600">Here's what's happening with your account today.</p>
            </div>

            {/* Upcoming Sessions */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Sessions</h2>
                <Link href="/sessions" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                  View all
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {upcomingSessions.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={session.counsellorImage}
                            alt={session.counsellorName}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-900">{session.counsellorName}</h3>
                            <p className="text-sm text-gray-500">
                              {session.date} at {session.time} ({session.duration})
                            </p>
                          </div>
                        </div>
                        <Link href={`/sessions/${session.id}`}>
                          <Button size="sm">Join Session</Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">No upcoming sessions</p>
                    <Link href="/counsellors">
                      <Button className="mt-3">Book a Session</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Recommended Experts */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recommended Experts</h2>
                <Link href="/counsellors" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedExperts.map((expert) => (
                  <div key={expert.id} className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex items-center">
                      <img
                        src={expert.image}
                        alt={expert.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">{expert.name}</h3>
                        <p className="text-sm text-gray-500">{expert.field}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-sm text-gray-700">{expert.rating}</span>
                      </div>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{expert.reviewCount} reviews</span>
                    </div>
                    <div className="mt-4">
                      <Link href={`/counsellors/${expert.id}`}>
                        <Button variant="outline" fullWidth>
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                          <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 