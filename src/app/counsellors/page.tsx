'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaStar, FaFilter, FaCalendarAlt, FaVideo, FaPhone } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { CounsellingField } from '@/types';

// Mock data for counsellors
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
  },
];

export default function CounsellorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<string>('');
  
  // Filter counsellors based on search and field
  const filteredCounsellors = counsellors.filter((counsellor) => {
    const matchesSearch = 
      searchTerm === '' || 
      counsellor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counsellor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counsellor.bio.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesField = selectedField === '' || 
      counsellor.specialties.some(specialty => specialty === selectedField as CounsellingField);
    
    return matchesSearch && matchesField;
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Istashr
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/counsellors"
                className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium"
              >
                Counsellors
              </Link>
              <Link
                href="/community"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Community
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                U
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Find Your Counsellor
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Connect with qualified counsellors specialized in various fields
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Search by name, specialty, or keywords..."
                leftIcon={<FaSearch />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </div>
            <div className="flex space-x-2">
              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
              >
                <option value="">All Specialties</option>
                {Object.values(CounsellingField).map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
              <Button leftIcon={<FaFilter />}>
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Counsellors list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCounsellors.length > 0 ? (
            filteredCounsellors.map((counsellor) => (
              <Card key={counsellor.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-start">
                      <img
                        src={counsellor.image}
                        alt={counsellor.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          <Link href={`/counsellors/${counsellor.id}`} className="hover:text-blue-600">
                            {counsellor.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-500">{counsellor.title}</p>
                        <div className="mt-1 flex items-center">
                          <div className="flex items-center">
                            <FaStar className="text-yellow-400 h-4 w-4" />
                            <span className="ml-1 text-sm text-gray-600">{counsellor.rating}</span>
                          </div>
                          <span className="mx-1 text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{counsellor.reviewCount} reviews</span>
                          <span className="mx-1 text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{counsellor.yearsExperience} years experience</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {counsellor.specialties.map((specialty, index) => (
                          <span
                            key={`${counsellor.id}-${specialty}-${index}`}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-3">{counsellor.bio}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">${counsellor.sessionPrice}</p>
                          <p className="text-xs text-gray-500">per session</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<FaCalendarAlt />}
                            onClick={() => {}}
                          >
                            Book
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {}}
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No counsellors found matching your criteria</p>
              <Button className="mt-4" onClick={() => { setSearchTerm(''); setSelectedField(''); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            &copy; {new Date().getFullYear()} Istashr. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 