'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  FaCalendarAlt, FaClock, FaVideo, FaPhone, 
  FaArrowLeft, FaCreditCard, FaCheckCircle 
} from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { authService } from '@/lib/auth';

// Mock data for counsellors (simplified version of the one in counsellor profile)
const counsellors = [
  {
    id: '1',
    name: 'Dr. Sara Ahmed',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    title: 'Clinical Psychologist',
    sessionPrice: 350,
    availability: ['Mon', 'Wed', 'Thu'],
  },
  {
    id: '2',
    name: 'Dr. Mohammed Al-Farsi',
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
    title: 'Family Therapist',
    sessionPrice: 400,
    availability: ['Tue', 'Thu', 'Sat'],
  },
  {
    id: '3',
    name: 'Layla Mahmoud',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    title: 'Career Counsellor',
    sessionPrice: 300,
    availability: ['Mon', 'Tue', 'Fri'],
  },
  {
    id: '4',
    name: 'Dr. Khalid Nasser',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
    title: 'Financial Advisor',
    sessionPrice: 375,
    availability: ['Wed', 'Thu', 'Sat'],
  },
  {
    id: '5',
    name: 'Nora Al-Qahtani',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
    title: 'Wellness Coach',
    sessionPrice: 325,
    availability: ['Mon', 'Wed', 'Fri'],
  },
  {
    id: '6',
    name: 'Dr. Ahmed Saeed',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    title: 'Relationship Counsellor',
    sessionPrice: 350,
    availability: ['Tue', 'Thu', 'Sat'],
  },
];

// Storage key for sessions
const SESSIONS_STORAGE_KEY = 'istashr_sessions';

// Available time slots
const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', 
  '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
];

// Get available dates for the next 14 days
const getAvailableDates = (availableDays: string[]) => {
  const dates = [];
  const dayMap: Record<string, number> = {
    'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6
  };
  
  const today = new Date();
  
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
    
    if (availableDays.includes(dayName)) {
      dates.push({
        date,
        dayName,
        formattedDate: date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          year: 'numeric'
        })
      });
    }
  }
  
  return dates;
};

export default function BookSessionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const counsellorId = searchParams.get('counsellorId');
  const sessionType = searchParams.get('type') || 'video';
  
  const [counsellor, setCounsellor] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingComplete, setBookingComplete] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  
  // Load counsellor data and check authentication
  useEffect(() => {
    // Check if user is authenticated
    const user = authService.getCurrentUser();
    if (!user) {
      // Redirect to login if not authenticated
      router.push('/auth/login?redirect=/sessions/book');
      return;
    }
    
    setCurrentUser(user);
    
    // Find counsellor by ID
    if (counsellorId) {
      const foundCounsellor = counsellors.find(c => c.id === counsellorId);
      if (foundCounsellor) {
        setCounsellor(foundCounsellor);
      } else {
        // Redirect to counsellors page if not found
        router.push('/counsellors');
      }
    } else {
      // Redirect to counsellors page if no ID provided
      router.push('/counsellors');
    }
    
    setIsLoading(false);
  }, [counsellorId, router]);
  
  // Get available dates based on counsellor's availability
  const availableDates = counsellor ? getAvailableDates(counsellor.availability) : [];
  
  // Handle date selection
  const handleDateSelect = (date: any) => {
    setSelectedDate(date);
  };
  
  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  // Handle booking confirmation
  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime || !currentUser || !counsellor) return;
    
    // Create session object
    const sessionDateTime = new Date(selectedDate.date);
    const [hours, minutes] = selectedTime.match(/(\d+):(\d+)/)?.slice(1) || [];
    let hour = parseInt(hours);
    if (selectedTime.includes('PM') && hour !== 12) {
      hour += 12;
    } else if (selectedTime.includes('AM') && hour === 12) {
      hour = 0;
    }
    
    sessionDateTime.setHours(hour, parseInt(minutes), 0, 0);
    
    const endDateTime = new Date(sessionDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1);
    
    const newSession = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      counsellorId: counsellor.id,
      counsellorName: counsellor.name,
      startTime: sessionDateTime,
      endTime: endDateTime,
      type: sessionType,
      status: 'SCHEDULED',
      price: counsellor.sessionPrice,
      createdAt: new Date()
    };
    
    // Save to localStorage
    const savedSessions = localStorage.getItem(SESSIONS_STORAGE_KEY);
    let sessions = [];
    
    if (savedSessions) {
      try {
        sessions = JSON.parse(savedSessions);
      } catch (error) {
        console.error('Failed to parse saved sessions:', error);
        sessions = [];
      }
    }
    
    sessions.push(newSession);
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
    
    // Update state
    setSessionId(newSession.id);
    setBookingComplete(true);
    setStep(3);
  };
  
  // Go to next step
  const goToNextStep = () => {
    if (step === 1 && selectedDate) {
      setStep(2);
    } else if (step === 2 && selectedTime) {
      setStep(3);
    }
  };
  
  // Go to previous step
  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  if (isLoading || !counsellor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking page...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href={`/counsellors/${counsellorId}`} className="text-blue-600 hover:text-blue-800 flex items-center">
            <FaArrowLeft className="mr-2" />
            Back to Counsellor Profile
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Book a Session</h1>
          <p className="text-gray-600 mt-2">
            Schedule a {sessionType === 'video' ? 'video' : 'phone'} session with {counsellor.name}
          </p>
        </div>
        
        {/* Progress steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <FaCalendarAlt className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm font-medium">Select Date</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div className={`h-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} style={{ width: step >= 2 ? '100%' : '0%' }}></div>
            </div>
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <FaClock className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm font-medium">Select Time</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div className={`h-full ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} style={{ width: step >= 3 ? '100%' : '0%' }}></div>
            </div>
            <div className={`flex flex-col items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <FaCreditCard className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm font-medium">Confirm</span>
            </div>
          </div>
        </div>
        
        {/* Booking steps */}
        <Card>
          <CardContent className="p-6">
            {/* Step 1: Select Date */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Select a Date</h2>
                
                {availableDates.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {availableDates.map((date, index) => (
                      <button
                        key={index}
                        className={`p-3 rounded-md border text-center ${
                          selectedDate && selectedDate.formattedDate === date.formattedDate
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                        }`}
                        onClick={() => handleDateSelect(date)}
                      >
                        <div className="font-medium">{date.dayName}</div>
                        <div className="text-sm">{date.formattedDate}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No available dates found for this counsellor.
                  </div>
                )}
                
                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={goToNextStep}
                    disabled={!selectedDate}
                  >
                    Next: Select Time
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 2: Select Time */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Select a Time for {selectedDate.formattedDate}
                </h2>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {timeSlots.map((time, index) => (
                    <button
                      key={index}
                      className={`p-3 rounded-md border text-center ${
                        selectedTime === time
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                      }`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={goToPreviousStep}
                  >
                    Back: Select Date
                  </Button>
                  <Button 
                    onClick={goToNextStep}
                    disabled={!selectedTime}
                  >
                    Next: Confirm Booking
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 3: Confirm Booking */}
            {step === 3 && (
              <div>
                {bookingComplete ? (
                  <div className="text-center py-8">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                      <FaCheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Booking Confirmed!</h2>
                    <p className="text-gray-600 mb-6">
                      Your session with {counsellor.name} has been scheduled.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto text-left">
                      <div className="mb-2">
                        <span className="font-medium">Session ID:</span> {sessionId}
                      </div>
                      <div className="mb-2">
                        <span className="font-medium">Date:</span> {selectedDate.formattedDate}
                      </div>
                      <div className="mb-2">
                        <span className="font-medium">Time:</span> {selectedTime}
                      </div>
                      <div className="mb-2">
                        <span className="font-medium">Type:</span> {sessionType === 'video' ? 'Video Call' : 'Phone Call'}
                      </div>
                      <div>
                        <span className="font-medium">Price:</span> {counsellor.sessionPrice} SAR
                      </div>
                    </div>
                    <div className="mt-8 flex justify-center space-x-4">
                      <Link href="/dashboard">
                        <Button>
                          Go to Dashboard
                        </Button>
                      </Link>
                      <Link href="/sessions">
                        <Button variant="outline">
                          View All Sessions
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Confirm Your Booking</h2>
                    
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <div className="flex items-start mb-4">
                        <img
                          src={counsellor.image}
                          alt={counsellor.name}
                          className="h-12 w-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{counsellor.name}</h3>
                          <p className="text-gray-600">{counsellor.title}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <FaCalendarAlt className="text-blue-600 mr-3" />
                          <div>
                            <div className="font-medium">Date</div>
                            <div>{selectedDate.formattedDate}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <FaClock className="text-blue-600 mr-3" />
                          <div>
                            <div className="font-medium">Time</div>
                            <div>{selectedTime}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          {sessionType === 'video' ? (
                            <FaVideo className="text-blue-600 mr-3" />
                          ) : (
                            <FaPhone className="text-blue-600 mr-3" />
                          )}
                          <div>
                            <div className="font-medium">Session Type</div>
                            <div>{sessionType === 'video' ? 'Video Call' : 'Phone Call'}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <FaCreditCard className="text-blue-600 mr-3" />
                          <div>
                            <div className="font-medium">Price</div>
                            <div>{counsellor.sessionPrice} SAR</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={goToPreviousStep}
                      >
                        Back: Select Time
                      </Button>
                      <Button 
                        onClick={handleConfirmBooking}
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 