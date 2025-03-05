'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaStar, FaCalendarAlt, FaVideo, FaPhone, 
  FaShieldAlt, FaLock, FaUnlock, FaTrash, FaClock,
  FaGraduationCap, FaCertificate, FaMoneyBillWave
} from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CounsellingField } from '@/types';
import { authService } from '@/lib/auth';
import { privateModeSetting } from '@/lib/seed';

// Mock data for counsellors (same as in the counsellors page)
const counsellors = [
  {
    id: '1',
    name: 'Dr. Sara Ahmed',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    title: 'Clinical Psychologist',
    specialties: [CounsellingField.MENTAL_HEALTH, CounsellingField.RELATIONSHIP],
    rating: 4.9,
    reviewCount: 124,
    yearsExperience: 12,
    bio: 'Specialized in cognitive behavioral therapy with extensive experience helping clients overcome anxiety, depression, and relationship challenges.',
    sessionPrice: 350,
    availability: ['Mon', 'Wed', 'Thu'],
    languages: ['Arabic', 'English'],
    education: ['Ph.D. in Clinical Psychology, King Saud University', 'M.Sc. in Psychology, Cairo University'],
    certifications: ['Licensed Clinical Psychologist', 'Certified CBT Practitioner'],
    contactInfo: {
      email: 'dr.sara@istashr.com',
      phone: '+966 50 123 4567'
    }
  },
  {
    id: '2',
    name: 'Dr. Mohammed Al-Farsi',
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
    title: 'Family Therapist',
    specialties: [CounsellingField.PARENTING, CounsellingField.RELATIONSHIP],
    rating: 4.8,
    reviewCount: 98,
    yearsExperience: 15,
    bio: 'Dedicated to helping families navigate challenges and build stronger relationships through evidence-based therapeutic approaches.',
    sessionPrice: 400,
    availability: ['Tue', 'Thu', 'Sat'],
    languages: ['Arabic', 'English', 'French'],
    education: ['Ph.D. in Family Therapy, King Abdulaziz University', 'M.A. in Counseling, American University of Beirut'],
    certifications: ['Licensed Family Therapist', 'Certified Parenting Coach'],
    contactInfo: {
      email: 'dr.mohammed@istashr.com',
      phone: '+966 55 987 6543'
    }
  },
  {
    id: '3',
    name: 'Layla Mahmoud',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    title: 'Career Counsellor',
    specialties: [CounsellingField.CAREER, CounsellingField.PERSONAL_DEVELOPMENT],
    rating: 4.7,
    reviewCount: 86,
    yearsExperience: 8,
    bio: 'Passionate about helping professionals find fulfilling career paths and develop strategies for workplace success and personal growth.',
    sessionPrice: 300,
    availability: ['Mon', 'Tue', 'Fri'],
    languages: ['Arabic', 'English'],
    education: ['M.Sc. in Organizational Psychology, King Fahd University', 'B.A. in Business Administration, Effat University'],
    certifications: ['Certified Career Coach', 'Professional Resume Writer'],
    contactInfo: {
      email: 'layla@istashr.com',
      phone: '+966 54 321 7890'
    }
  },
  {
    id: '4',
    name: 'Dr. Khalid Nasser',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
    title: 'Financial Advisor',
    specialties: [CounsellingField.FINANCIAL_ADVICE, CounsellingField.PERSONAL_DEVELOPMENT],
    rating: 4.9,
    reviewCount: 112,
    yearsExperience: 10,
    bio: 'Specialized in helping individuals and families achieve financial wellness through personalized planning and practical strategies.',
    sessionPrice: 375,
    availability: ['Wed', 'Thu', 'Sat'],
    languages: ['Arabic', 'English'],
    education: ['Ph.D. in Finance, King Fahd University of Petroleum and Minerals', 'MBA, London Business School'],
    certifications: ['Certified Financial Planner', 'Chartered Financial Analyst'],
    contactInfo: {
      email: 'dr.khalid@istashr.com',
      phone: '+966 56 789 0123'
    }
  },
  {
    id: '5',
    name: 'Nora Al-Qahtani',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
    title: 'Wellness Coach',
    specialties: [CounsellingField.MENTAL_HEALTH, CounsellingField.PERSONAL_DEVELOPMENT],
    rating: 4.8,
    reviewCount: 74,
    yearsExperience: 6,
    bio: 'Holistic approach to mental wellness, combining traditional therapy techniques with mindfulness and stress management practices.',
    sessionPrice: 325,
    availability: ['Mon', 'Wed', 'Fri'],
    languages: ['Arabic', 'English'],
    education: ['M.Sc. in Clinical Psychology, Princess Nourah University', 'B.Sc. in Psychology, King Saud University'],
    certifications: ['Certified Wellness Coach', 'Mindfulness Practitioner'],
    contactInfo: {
      email: 'nora@istashr.com',
      phone: '+966 50 345 6789'
    }
  },
  {
    id: '6',
    name: 'Dr. Ahmed Saeed',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    title: 'Relationship Counsellor',
    specialties: [CounsellingField.RELATIONSHIP, CounsellingField.PARENTING],
    rating: 4.7,
    reviewCount: 91,
    yearsExperience: 9,
    bio: 'Dedicated to helping couples and families build healthier relationships through improved communication and conflict resolution strategies.',
    sessionPrice: 350,
    availability: ['Tue', 'Thu', 'Sat'],
    languages: ['Arabic', 'English'],
    education: ['Ph.D. in Psychology, King Saud University', 'M.A. in Counseling Psychology, American University in Cairo'],
    certifications: ['Licensed Marriage and Family Therapist', 'Certified Relationship Coach'],
    contactInfo: {
      email: 'dr.ahmed@istashr.com',
      phone: '+966 55 456 7890'
    }
  },
];

// Storage key for private messages
const PRIVATE_MESSAGES_KEY = 'istashr_private_messages';

// Interface for private messages
interface PrivateMessage {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  expiresAt: Date;
}

export default function CounsellorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const counsellorId = params.id as string;
  
  const [counsellor, setCounsellor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isPrivateModeActive, setIsPrivateModeActive] = useState(false);
  const [privateMessage, setPrivateMessage] = useState('');
  const [privateMessages, setPrivateMessages] = useState<PrivateMessage[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  // Load counsellor data and check authentication
  useEffect(() => {
    // Check if user is authenticated
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    
    // Find counsellor by ID
    const foundCounsellor = counsellors.find(c => c.id === counsellorId);
    if (foundCounsellor) {
      setCounsellor(foundCounsellor);
    } else {
      // Redirect to counsellors page if not found
      router.push('/counsellors');
    }
    
    // Load private messages from localStorage
    loadPrivateMessages();
    
    setIsLoading(false);
  }, [counsellorId, router]);
  
  // Load private messages from localStorage
  const loadPrivateMessages = () => {
    if (typeof window === 'undefined' || !currentUser) return;
    
    const savedMessages = localStorage.getItem(PRIVATE_MESSAGES_KEY);
    if (savedMessages) {
      try {
        // Parse dates properly
        const parsedMessages = JSON.parse(savedMessages, (key, value) => {
          if (key === 'timestamp' || key === 'expiresAt') {
            return new Date(value);
          }
          return value;
        });
        
        // Filter messages for current user and counsellor
        const relevantMessages = parsedMessages.filter((msg: PrivateMessage) => 
          (msg.senderId === currentUser.id && msg.receiverId === counsellorId) ||
          (msg.senderId === counsellorId && msg.receiverId === currentUser.id)
        );
        
        // Filter out expired messages
        const now = new Date();
        const validMessages = relevantMessages.filter((msg: PrivateMessage) => 
          msg.expiresAt > now
        );
        
        setPrivateMessages(validMessages);
      } catch (error) {
        console.error('Failed to parse private messages:', error);
        setPrivateMessages([]);
      }
    }
  };
  
  // Toggle private mode
  const togglePrivateMode = () => {
    setIsPrivateModeActive(!isPrivateModeActive);
    if (!isPrivateModeActive) {
      // Load messages when activating private mode
      loadPrivateMessages();
    }
  };
  
  // Send private message
  const sendPrivateMessage = () => {
    if (!privateMessage.trim() || !currentUser || !counsellor) return;
    
    // Calculate expiry time (e.g., 24 hours from now)
    const now = new Date();
    const expiryTime = new Date(now.getTime() + (privateModeSetting.messageExpiryHours * 60 * 60 * 1000));
    
    const newMessage: PrivateMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId: counsellor.id,
      content: privateMessage,
      timestamp: now,
      expiresAt: expiryTime
    };
    
    // Add to state
    const updatedMessages = [...privateMessages, newMessage];
    setPrivateMessages(updatedMessages);
    
    // Save to localStorage
    savePrivateMessages(updatedMessages);
    
    // Clear input
    setPrivateMessage('');
  };
  
  // Save private messages to localStorage
  const savePrivateMessages = (messages: PrivateMessage[]) => {
    if (typeof window === 'undefined') return;
    
    // Get all existing messages
    const savedMessages = localStorage.getItem(PRIVATE_MESSAGES_KEY);
    let allMessages: PrivateMessage[] = [];
    
    if (savedMessages) {
      try {
        // Parse dates properly
        allMessages = JSON.parse(savedMessages, (key, value) => {
          if (key === 'timestamp' || key === 'expiresAt') {
            return new Date(value);
          }
          return value;
        });
        
        // Filter out messages between current user and counsellor
        allMessages = allMessages.filter((msg: PrivateMessage) => 
          !((msg.senderId === currentUser.id && msg.receiverId === counsellor.id) ||
            (msg.senderId === counsellor.id && msg.receiverId === currentUser.id))
        );
      } catch (error) {
        console.error('Failed to parse existing messages:', error);
        allMessages = [];
      }
    }
    
    // Add new messages
    const combinedMessages = [...allMessages, ...messages];
    
    // Save to localStorage
    localStorage.setItem(PRIVATE_MESSAGES_KEY, JSON.stringify(combinedMessages));
  };
  
  // Delete all private messages
  const deleteAllPrivateMessages = () => {
    if (!currentUser || !counsellor) return;
    
    // Update state
    setPrivateMessages([]);
    
    // Update localStorage
    savePrivateMessages([]);
  };
  
  // Format timestamp
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  if (isLoading || !counsellor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading counsellor profile...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/counsellors" className="text-blue-600 hover:text-blue-800">
            &larr; Back to Counsellors
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main profile */}
          <div className="md:w-2/3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={counsellor.image}
                      alt={counsellor.name}
                      className="h-32 w-32 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h1 className="text-2xl font-bold text-gray-900">{counsellor.name}</h1>
                    <p className="text-lg text-gray-600">{counsellor.title}</p>
                    
                    <div className="mt-2 flex items-center">
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 h-5 w-5" />
                        <span className="ml-1 text-gray-700">{counsellor.rating}</span>
                      </div>
                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-gray-700">{counsellor.reviewCount} reviews</span>
                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-gray-700">{counsellor.yearsExperience} years experience</span>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {counsellor.specialties.map((specialty: string, index: number) => (
                        <span
                          key={`${counsellor.id}-specialty-${index}`}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {counsellor.languages.map((language: string, index: number) => (
                        <span
                          key={`${counsellor.id}-lang-${index}`}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">About</h2>
                  <p className="text-gray-700">{counsellor.bio}</p>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                      <FaGraduationCap className="mr-2 text-blue-600" />
                      Education
                    </h3>
                    <ul className="space-y-2">
                      {counsellor.education.map((edu: string, index: number) => (
                        <li key={`edu-${index}`} className="text-gray-700">
                          • {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                      <FaCertificate className="mr-2 text-blue-600" />
                      Certifications
                    </h3>
                    <ul className="space-y-2">
                      {counsellor.certifications.map((cert: string, index: number) => (
                        <li key={`cert-${index}`} className="text-gray-700">
                          • {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                    <FaCalendarAlt className="mr-2 text-blue-600" />
                    Availability
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {counsellor.availability.map((day: string, index: number) => (
                      <span
                        key={`avail-${index}`}
                        className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-green-100 text-green-800"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                    <FaMoneyBillWave className="mr-2 text-blue-600" />
                    Session Fee
                  </h3>
                  <p className="text-gray-700">
                    <span className="text-xl font-semibold text-gray-900">{counsellor.sessionPrice} SAR</span> per session
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/3 space-y-6">
            {/* Book session card */}
            <Card>
              <CardHeader>
                <CardTitle>Book a Session</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Choose your preferred session type with {counsellor.name}
                </p>
                
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    leftIcon={<FaVideo />}
                    fullWidth
                    onClick={() => router.push(`/sessions/book?counsellorId=${counsellor.id}&type=video`)}
                  >
                    Video Session
                  </Button>
                  <Button
                    leftIcon={<FaPhone />}
                    variant="outline"
                    fullWidth
                    onClick={() => router.push(`/sessions/book?counsellorId=${counsellor.id}&type=phone`)}
                  >
                    Phone Session
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Private mode card */}
            {currentUser && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FaShieldAlt className="mr-2 text-blue-600" />
                    Private Mode
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {isPrivateModeActive ? (
                        <FaLock className="text-green-600 mr-2" />
                      ) : (
                        <FaUnlock className="text-gray-400 mr-2" />
                      )}
                      <span className={isPrivateModeActive ? "text-green-600 font-medium" : "text-gray-600"}>
                        {isPrivateModeActive ? "Private Mode Active" : "Private Mode Inactive"}
                      </span>
                    </div>
                    <Button
                      variant={isPrivateModeActive ? "default" : "outline"}
                      size="sm"
                      onClick={togglePrivateMode}
                    >
                      {isPrivateModeActive ? "Deactivate" : "Activate"}
                    </Button>
                  </div>
                  
                  {isPrivateModeActive && (
                    <div className="mt-4 space-y-4">
                      <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800 flex items-start">
                        <FaLock className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">End-to-end encrypted messages</p>
                          <p>Messages will automatically delete after {privateModeSetting.messageExpiryHours} hours</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="max-h-60 overflow-y-auto p-3 bg-gray-50 rounded-md">
                          {privateMessages.length > 0 ? (
                            <div className="space-y-3">
                              {privateMessages.map((msg) => (
                                <div 
                                  key={msg.id}
                                  className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                                >
                                  <div 
                                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                                      msg.senderId === currentUser.id 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-200 text-gray-800'
                                    }`}
                                  >
                                    <div className="text-sm">{msg.content}</div>
                                    <div className="text-xs mt-1 flex items-center justify-end">
                                      <FaClock className="h-3 w-3 mr-1" />
                                      {formatMessageTime(msg.timestamp)}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center text-gray-500 py-4">
                              No messages yet. Start a private conversation.
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Type a secure message..."
                            value={privateMessage}
                            onChange={(e) => setPrivateMessage(e.target.value)}
                          />
                          <Button onClick={sendPrivateMessage}>Send</Button>
                        </div>
                        
                        {privateMessages.length > 0 && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            leftIcon={<FaTrash />}
                            onClick={deleteAllPrivateMessages}
                          >
                            Delete All Messages
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {/* Contact info card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span> {counsellor.contactInfo.email}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Phone:</span> {counsellor.contactInfo.phone}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 