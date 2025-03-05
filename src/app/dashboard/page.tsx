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
      counsellorName: 'د. سارة جونسون',
      counsellorImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      date: '2023-06-15',
      time: '10:00 صباحًا',
      duration: '50 دقيقة',
    },
    {
      id: '2',
      counsellorName: 'د. محمد الشمري',
      counsellorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: '2023-06-18',
      time: '2:30 مساءً',
      duration: '50 دقيقة',
    },
  ];

  // Mock data for recommended counsellors
  const recommendedCounsellors = [
    {
      id: '1',
      name: 'د. فاطمة العلي',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      specialty: 'الصحة النفسية',
      rating: 4.9,
      reviewCount: 124,
    },
    {
      id: '2',
      name: 'د. أحمد الخالدي',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      specialty: 'التوجيه المهني',
      rating: 4.8,
      reviewCount: 98,
    },
    {
      id: '3',
      name: 'د. نورة القحطاني',
      image: 'https://randomuser.me/api/portraits/women/63.jpg',
      specialty: 'العلاقات الأسرية',
      rating: 4.7,
      reviewCount: 87,
    },
  ];

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
                className="text-blue-600 px-3 py-2 text-sm font-medium border-b-2 border-blue-600"
              >
                لوحة التحكم
              </Link>
              <Link
                href="/counsellors"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                المستشارون
              </Link>
              <Link
                href="/community"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                المجتمع
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                عن المنصة
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/profile" className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {currentUser?.name?.charAt(0) || 'U'}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">مرحبًا، {currentUser?.name || 'مستخدم'}</h1>
          <p className="mt-1 text-gray-600">مرحبًا بك في لوحة التحكم الخاصة بك</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">إجراءات سريعة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/counsellors">
              <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                  <FaSearch className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-900">البحث عن مستشار</span>
              </div>
            </Link>
            
            <Link href="/dashboard/profile">
              <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                  <FaUser className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-900">الملف الشخصي</span>
              </div>
            </Link>
            
            <Link href="/sessions/history">
              <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                  <FaHistory className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-900">سجل الجلسات</span>
              </div>
            </Link>
            
            <Link href="/settings">
              <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                  <FaCog className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-900">الإعدادات</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">الجلسات القادمة</h2>
            <Link href="/sessions" className="text-sm text-blue-600 hover:text-blue-800">
              عرض الكل
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {upcomingSessions.length > 0 ? (
              <div className="divide-y">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="p-4 flex items-center">
                    <img
                      src={session.counsellorImage}
                      alt={session.counsellorName}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{session.counsellorName}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <FaCalendarAlt className="ml-1" />
                        <span>{new Date(session.date).toLocaleDateString('ar-SA')}</span>
                        <span className="mx-2">•</span>
                        <span>{session.time}</span>
                        <span className="mx-2">•</span>
                        <span>{session.duration}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/sessions/${session.id}`)}
                    >
                      التفاصيل
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 mb-4">ليس لديك أي جلسات قادمة</p>
                <Button onClick={() => router.push('/counsellors')}>
                  البحث عن مستشار
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Counsellors */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">مستشارون موصى بهم</h2>
            <Link href="/counsellors" className="text-sm text-blue-600 hover:text-blue-800">
              عرض الكل
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedCounsellors.map((counsellor) => (
              <div key={counsellor.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <img
                      src={counsellor.image}
                      alt={counsellor.name}
                      className="w-12 h-12 rounded-full object-cover ml-3"
                    />
                    <div>
                      <h3 className="font-medium">{counsellor.name}</h3>
                      <p className="text-sm text-gray-500">{counsellor.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-sm font-medium">{counsellor.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({counsellor.reviewCount} تقييم)</span>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => router.push(`/counsellors/${counsellor.id}`)}
                  >
                    عرض الملف الشخصي
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 