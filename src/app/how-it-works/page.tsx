'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { FaUserMd, FaCalendarCheck, FaComments, FaShieldAlt, FaUsers, FaChartLine } from 'react-icons/fa';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
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
                Dashboard
              </Link>
              <Link
                href="/counsellors"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Find Experts
              </Link>
              <Link
                href="/community"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Community
              </Link>
              <Link
                href="/how-it-works"
                className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium"
              >
                How It Works
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
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How استشر Works
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Your journey to better wellbeing in a few simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {/* Step 1 */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-lg bg-blue-100 overflow-hidden">
                <div className="flex items-center justify-center h-full">
                  <FaUserMd className="h-24 w-24 text-blue-500" />
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    1
                  </div>
                </div>
                <h2 className="ml-4 text-2xl font-bold text-gray-900">Create Your Account</h2>
              </div>
              <div className="mt-5 prose prose-blue text-gray-500">
                <p>
                  Sign up for a free account to access our platform. Your information is kept secure and confidential.
                  You can choose to remain anonymous in community discussions if you prefer.
                </p>
                <ul>
                  <li>Simple registration process</li>
                  <li>Secure and confidential</li>
                  <li>Options for privacy and anonymity</li>
                </ul>
                <Link href="/auth/signup" className="text-blue-600 font-medium hover:text-blue-500">
                  Create your account now →
                </Link>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="mt-10 lg:mt-0 lg:order-first">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    2
                  </div>
                </div>
                <h2 className="ml-4 text-2xl font-bold text-gray-900">Find the Right Expert</h2>
              </div>
              <div className="mt-5 prose prose-blue text-gray-500">
                <p>
                  Browse our network of qualified counsellors and experts across various fields. Filter by specialty,
                  availability, language, and more to find the perfect match for your needs.
                </p>
                <ul>
                  <li>Diverse range of specialties</li>
                  <li>Verified credentials and reviews</li>
                  <li>Flexible filtering options</li>
                </ul>
                <Link href="/counsellors" className="text-blue-600 font-medium hover:text-blue-500">
                  Browse our experts →
                </Link>
              </div>
            </div>
            <div className="relative lg:order-last">
              <div className="aspect-w-16 aspect-h-9 rounded-lg bg-blue-100 overflow-hidden">
                <div className="flex items-center justify-center h-full">
                  <FaUsers className="h-24 w-24 text-blue-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-lg bg-blue-100 overflow-hidden">
                <div className="flex items-center justify-center h-full">
                  <FaCalendarCheck className="h-24 w-24 text-blue-500" />
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    3
                  </div>
                </div>
                <h2 className="ml-4 text-2xl font-bold text-gray-900">Schedule Your Session</h2>
              </div>
              <div className="mt-5 prose prose-blue text-gray-500">
                <p>
                  Book a session at a time that works for you. Choose between video calls, voice calls, or text-based
                  counselling depending on your comfort level and needs.
                </p>
                <ul>
                  <li>Flexible scheduling options</li>
                  <li>Multiple communication channels</li>
                  <li>Reminder notifications</li>
                </ul>
                <Link href="/sessions/new" className="text-blue-600 font-medium hover:text-blue-500">
                  Book a session →
                </Link>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="mt-10 lg:mt-0 lg:order-first">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    4
                  </div>
                </div>
                <h2 className="ml-4 text-2xl font-bold text-gray-900">Connect and Communicate</h2>
              </div>
              <div className="mt-5 prose prose-blue text-gray-500">
                <p>
                  Attend your session through our secure platform. All communications are encrypted and private,
                  ensuring your confidentiality and comfort during the counselling process.
                </p>
                <ul>
                  <li>End-to-end encryption</li>
                  <li>Private and secure environment</li>
                  <li>Option for anonymous sessions</li>
                </ul>
              </div>
            </div>
            <div className="relative lg:order-last">
              <div className="aspect-w-16 aspect-h-9 rounded-lg bg-blue-100 overflow-hidden">
                <div className="flex items-center justify-center h-full">
                  <FaComments className="h-24 w-24 text-blue-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-lg bg-blue-100 overflow-hidden">
                <div className="flex items-center justify-center h-full">
                  <FaChartLine className="h-24 w-24 text-blue-500" />
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    5
                  </div>
                </div>
                <h2 className="ml-4 text-2xl font-bold text-gray-900">Track Your Progress</h2>
              </div>
              <div className="mt-5 prose prose-blue text-gray-500">
                <p>
                  Monitor your journey through your personal dashboard. Keep track of past sessions, notes, and
                  progress over time. Set goals and celebrate achievements along the way.
                </p>
                <ul>
                  <li>Personal progress tracking</li>
                  <li>Session history and notes</li>
                  <li>Goal setting and achievement monitoring</li>
                </ul>
                <Link href="/dashboard" className="text-blue-600 font-medium hover:text-blue-500">
                  View your dashboard →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Community section */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Connect with others facing similar challenges. Share experiences, ask questions, and offer support
              in our moderated community forums.
            </p>
            <Link href="/community" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Explore Community
            </Link>
          </div>
        </div>

        {/* Privacy section */}
        <div className="mt-16 border border-gray-200 rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
              <FaShieldAlt className="h-16 w-16 text-blue-500" />
            </div>
            <div className="md:w-3/4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy is Our Priority</h2>
              <p className="text-gray-600 mb-4">
                At استشر, we take your privacy and data security seriously. All communications are encrypted,
                and you have full control over your personal information.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  End-to-end encryption for all communications
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Option for anonymous participation
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Control over your data and privacy settings
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            &copy; {new Date().getFullYear()} استشر. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 