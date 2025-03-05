'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaEdit, FaArrowLeft } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { authService } from '@/lib/auth';
import { UserRole } from '@/types';

// تعريف واجهة لبيانات المستخدم
interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  joinedDate: Date;
  sessions: {
    total: number;
    upcoming: number;
    completed: number;
  };
  preferences: {
    language: string;
    notifications: boolean;
    anonymousMode: boolean;
  };
}

export default function UserProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  
  useEffect(() => {
    // Check if user is authenticated
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/auth/login');
      return;
    }
    
    // In a real app, we would fetch user data from API
    // For now, we'll use mock data
    const mockUserData: UserData = {
      id: '123',
      name: 'محمد عبدالله',
      email: 'mohammed@example.com',
      phone: '+966 50 123 4567',
      role: UserRole.USER,
      joinedDate: new Date('2023-01-15'),
      sessions: {
        total: 8,
        upcoming: 2,
        completed: 6
      },
      preferences: {
        language: 'ar',
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
          <p className="mt-4 text-gray-600">جاري تحميل الملف الشخصي...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">خطأ في تحميل الملف الشخصي</p>
          <Button 
            className="mt-4"
            onClick={() => router.push('/dashboard')}
            leftIcon={<FaArrowLeft />}
          >
            العودة إلى لوحة التحكم
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
            <FaArrowLeft className="ml-2" /> العودة إلى لوحة التحكم
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">الملف الشخصي</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>معلومات الملف الشخصي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl mb-4">
                  {user.name.charAt(0)}
                </div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-500 text-sm mt-1">
                  عضو منذ {user.joinedDate.toLocaleDateString('ar-SA')}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaEnvelope className="text-gray-400 mt-1 ml-3" />
                  <div>
                    <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaPhone className="text-gray-400 mt-1 ml-3" />
                  <div>
                    <p className="text-sm text-gray-500">رقم الهاتف</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaUser className="text-gray-400 mt-1 ml-3" />
                  <div>
                    <p className="text-sm text-gray-500">نوع الحساب</p>
                    <p className="font-medium">{user.role === 'USER' ? 'مستخدم' : user.role === 'COUNSELLOR' ? 'مستشار' : 'مدير'}</p>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6"
                leftIcon={<FaEdit />}
                onClick={() => alert('سيتم تنفيذ وظيفة تعديل الملف الشخصي قريبًا')}
              >
                تعديل الملف الشخصي
              </Button>
            </CardContent>
          </Card>
          
          {/* Session History */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>سجل الجلسات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-blue-600">{user.sessions.total}</p>
                  <p className="text-sm text-gray-600">إجمالي الجلسات</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">{user.sessions.completed}</p>
                  <p className="text-sm text-gray-600">مكتملة</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-yellow-600">{user.sessions.upcoming}</p>
                  <p className="text-sm text-gray-600">قادمة</p>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h3 className="text-sm font-medium">الجلسات الأخيرة</h3>
                </div>
                <div className="divide-y">
                  {[1, 2, 3].map((_, index) => (
                    <div key={`session-${index}`} className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium">جلسة مع د. {['سارة أحمد', 'محمد الفارسي', 'ليلى محمود'][index]}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <FaCalendarAlt className="ml-1" />
                          <span>
                            {new Date(Date.now() - (index + 1) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('ar-SA')}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{['10:00 صباحًا', '2:30 مساءً', '4:00 مساءً'][index]}</span>
                        </div>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          index === 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {index === 0 ? 'قادمة' : 'مكتملة'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline"
                className="w-full mt-4"
                onClick={() => router.push('/sessions/history')}
              >
                عرض جميع الجلسات
              </Button>
            </CardContent>
          </Card>
          
          {/* Preferences */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>إعدادات الحساب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">اللغة</h3>
                  <p className="text-gray-600 mb-4">الحالية: <span className="font-medium">{user.preferences.language}</span></p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => alert('سيتم تنفيذ إعدادات اللغة قريبًا')}
                  >
                    تغيير اللغة
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">الإشعارات</h3>
                  <p className="text-gray-600 mb-4">الحالة: <span className="font-medium">{user.preferences.notifications ? 'مفعلة' : 'معطلة'}</span></p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => alert('سيتم تنفيذ إعدادات الإشعارات قريبًا')}
                  >
                    إدارة الإشعارات
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">الوضع المجهول</h3>
                  <p className="text-gray-600 mb-4">الحالة: <span className="font-medium">{user.preferences.anonymousMode ? 'مفعل' : 'معطل'}</span></p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => alert('سيتم تنفيذ إعدادات الخصوصية قريبًا')}
                  >
                    إعدادات الخصوصية
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