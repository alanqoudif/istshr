'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaStar, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { CounsellingField } from '@/types';

// Mock data for experts
const experts = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    fields: [CounsellingField.MENTAL_HEALTH],
    rating: 4.9,
    reviewCount: 124,
    experience: 8,
    hourlyRate: 85,
    bio: 'Licensed psychologist with expertise in anxiety, depression, and stress management. I provide a safe space for clients to explore their emotions and develop coping strategies.',
    availability: ['Mon', 'Wed', 'Fri'],
  },
  {
    id: '2',
    name: 'Michael Chen',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    fields: [CounsellingField.CAREER_GUIDANCE],
    rating: 4.7,
    reviewCount: 98,
    experience: 12,
    hourlyRate: 95,
    bio: 'Career coach with over a decade of experience helping professionals navigate career transitions, improve job satisfaction, and achieve their professional goals.',
    availability: ['Tue', 'Thu', 'Sat'],
  },
  {
    id: '3',
    name: 'Dr. Emily Wilson',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    fields: [CounsellingField.MENTAL_HEALTH, CounsellingField.RELATIONSHIP],
    rating: 4.9,
    reviewCount: 156,
    experience: 15,
    hourlyRate: 110,
    bio: 'Clinical psychologist specializing in relationship counseling and family therapy. I help couples and families improve communication and resolve conflicts.',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  },
  {
    id: '4',
    name: 'Robert Garcia',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    fields: [CounsellingField.FINANCIAL_ADVICE],
    rating: 4.8,
    reviewCount: 87,
    experience: 10,
    hourlyRate: 90,
    bio: 'Certified financial planner helping clients achieve financial wellness through personalized advice on budgeting, investing, and long-term financial planning.',
    availability: ['Wed', 'Thu', 'Fri'],
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    image: 'https://randomuser.me/api/portraits/women/24.jpg',
    fields: [CounsellingField.MENTAL_HEALTH, CounsellingField.PARENTING],
    rating: 4.8,
    reviewCount: 112,
    experience: 9,
    hourlyRate: 95,
    bio: 'Child psychologist specializing in parenting guidance and child development. I help parents navigate challenges and build stronger relationships with their children.',
    availability: ['Mon', 'Tue', 'Sat'],
  },
  {
    id: '6',
    name: 'James Wilson',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    fields: [CounsellingField.EDUCATION],
    rating: 4.6,
    reviewCount: 78,
    experience: 7,
    hourlyRate: 75,
    bio: 'Education consultant with experience helping students of all ages achieve academic success through personalized learning strategies and educational planning.',
    availability: ['Tue', 'Wed', 'Thu'],
  },
];

export default function ExpertsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  // Filter experts based on search term and filters
  const filteredExperts = experts.filter((expert) => {
    // Search term filter
    const matchesSearch =
      searchTerm === '' ||
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.fields.some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()));

    // Field filter
    const matchesField =
      selectedField === '' || expert.fields.some((field) => field === selectedField);

    // Price range filter
    const matchesPrice = expert.hourlyRate >= priceRange[0] && expert.hourlyRate <= priceRange[1];

    // Rating filter
    const matchesRating = ratingFilter === null || expert.rating >= ratingFilter;

    return matchesSearch && matchesField && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Counsellia
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                About
              </Link>
              <Link
                href="/experts"
                className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium"
              >
                Find Experts
              </Link>
              <Link
                href="/how-it-works"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                How It Works
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Resources
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Find Your Perfect Counsellor
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Browse our network of professional counsellors across various fields
          </p>
        </div>

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
            <div>
              <Button
                variant="outline"
                leftIcon={<FaFilter />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
            </div>
          </div>

          {showFilters && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Counselling Field
                    </label>
                    <select
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      value={selectedField}
                      onChange={(e) => setSelectedField(e.target.value)}
                    >
                      <option value="">All Fields</option>
                      {Object.values(CounsellingField).map((field) => (
                        <option key={field} value={field}>
                          {field}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range (per hour)
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="200"
                        step="5"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], parseInt(e.target.value)])
                        }
                        className="w-full"
                      />
                      <span className="text-sm text-gray-500">
                        ${priceRange[0]} - ${priceRange[1]}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Rating
                    </label>
                    <div className="flex space-x-2">
                      {[null, 3, 3.5, 4, 4.5].map((rating) => (
                        <button
                          key={rating === null ? 'all' : rating}
                          className={`px-3 py-1 rounded-md text-sm ${
                            ratingFilter === rating
                              ? 'bg-blue-100 text-blue-700 border border-blue-300'
                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                          onClick={() => setRatingFilter(rating)}
                        >
                          {rating === null ? 'All' : `${rating}+`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedField('');
                      setPriceRange([0, 200]);
                      setRatingFilter(null);
                    }}
                  >
                    Reset Filters
                  </Button>
                  <Button size="sm" onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.length > 0 ? (
            filteredExperts.map((expert) => (
              <Card key={expert.id} variant="bordered" className="h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="h-24 w-24 rounded-full mb-4"
                    />
                    <h3 className="text-lg font-medium text-gray-900">{expert.name}</h3>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {expert.fields.map((field) => (
                        <span
                          key={field}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center mt-2">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-700">
                        {expert.rating} ({expert.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      {expert.experience} years experience
                    </div>
                    <div className="mt-1 text-sm font-medium text-gray-900">${expert.hourlyRate}/hour</div>
                    <p className="mt-4 text-sm text-gray-600 text-center line-clamp-3">
                      {expert.bio}
                    </p>
                    <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                      <FaCalendarAlt className="mr-2" />
                      <span>Available: {expert.availability.join(', ')}</span>
                    </div>
                    <div className="mt-6 flex space-x-3 w-full">
                      <Link href={`/experts/${expert.id}`} className="flex-1">
                        <Button variant="outline" fullWidth>
                          View Profile
                        </Button>
                      </Link>
                      <Link href={`/booking/${expert.id}`} className="flex-1">
                        <Button fullWidth>Book Session</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No experts found</h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your filters or search criteria to find more experts.
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedField('');
                  setPriceRange([0, 200]);
                  setRatingFilter(null);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; {new Date().getFullYear()} Counsellia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 