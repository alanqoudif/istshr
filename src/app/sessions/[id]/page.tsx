'use client';

import React from 'react';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaFileAlt, FaInfoCircle } from 'react-icons/fa';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SessionChat from '@/components/sessions/SessionChat';

interface SessionPageProps {
  params: {
    id: string;
  };
}

export default function SessionPage({ params }: SessionPageProps) {
  const sessionId = params.id;
  
  // Mock session data - in a real app, this would be fetched from an API
  const sessionData = {
    id: sessionId,
    counsellorName: 'Dr. Sarah Johnson',
    counsellorImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    field: 'Mental Health',
    startTime: new Date(),
    endTime: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
    status: 'IN_PROGRESS',
    isActive: true
  };
  
  // Calculate remaining time
  const remainingMinutes = Math.floor((sessionData.endTime.getTime() - Date.now()) / (1000 * 60));
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-gray-500 hover:text-blue-600 mr-4">
                <FaArrowLeft />
              </Link>
              <span className="text-xl font-bold text-blue-600">استشر</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 flex items-center">
                <FaClock className="mr-1" />
                <span>{remainingMinutes} minutes remaining</span>
              </div>
              <Button variant="outline" size="sm" leftIcon={<FaFileAlt />}>
                Session Notes
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Session info sidebar */}
            <div className="md:w-1/4">
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Session Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Counsellor</h3>
                      <div className="mt-1 flex items-center">
                        <img 
                          src={sessionData.counsellorImage} 
                          alt={sessionData.counsellorName}
                          className="h-10 w-10 rounded-full mr-2"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{sessionData.counsellorName}</p>
                          <p className="text-xs text-gray-500">{sessionData.field}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                      <div className="mt-1 flex items-center text-sm text-gray-900">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        <span>
                          {sessionData.startTime.toLocaleDateString()} at {' '}
                          {sessionData.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Duration</h3>
                      <p className="mt-1 text-sm text-gray-900">60 minutes</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Session ID</h3>
                      <p className="mt-1 text-sm text-gray-900">{sessionData.id}</p>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex items-center text-sm text-blue-600">
                        <FaInfoCircle className="mr-2" />
                        <span>Need help? Contact support</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-4">
                <Button variant="outline" fullWidth leftIcon={<FaFileAlt />}>
                  Download Session Transcript
                </Button>
              </div>
            </div>
            
            {/* Chat area */}
            <div className="md:w-3/4">
              <Card className="h-[calc(100vh-180px)]">
                <SessionChat 
                  sessionId={sessionData.id}
                  counsellorName={sessionData.counsellorName}
                  counsellorImage={sessionData.counsellorImage}
                  isActive={sessionData.isActive}
                />
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 