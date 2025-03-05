'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';

export default function AboutPage() {
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
                href="/experts"
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
                href="/about"
                className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium"
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
            About استشر
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Your trusted platform for professional counselling and community support
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At استشر, our mission is to make professional counselling accessible, affordable, and convenient for everyone. 
              We believe that mental health support should be available to all, regardless of location or circumstances.
            </p>
            <p className="text-gray-600">
              We strive to create a safe, supportive environment where individuals can connect with qualified counsellors, 
              share experiences with peers, and access resources to improve their wellbeing.
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-3 mt-0.5">1</span>
                <span className="text-gray-600"><strong>Accessibility:</strong> Making mental health support available to everyone</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-3 mt-0.5">2</span>
                <span className="text-gray-600"><strong>Confidentiality:</strong> Ensuring privacy and security in all interactions</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-3 mt-0.5">3</span>
                <span className="text-gray-600"><strong>Quality:</strong> Connecting users with qualified, experienced professionals</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-3 mt-0.5">4</span>
                <span className="text-gray-600"><strong>Community:</strong> Fostering supportive peer connections and shared growth</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How استشر Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Find the Right Support</h3>
                <p className="text-gray-600">
                  Browse our network of qualified counsellors specializing in various fields, or connect with peers facing similar challenges.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Connect Securely</h3>
                <p className="text-gray-600">
                  Schedule sessions with counsellors or participate in community discussions through our secure, private platform.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Grow and Improve</h3>
                <p className="text-gray-600">
                  Access ongoing support, track your progress, and utilize resources to help you achieve your personal goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of others who have found support, guidance, and community on استشر.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth/signup" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Sign Up Now
            </Link>
            <Link href="/experts" className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Browse Counsellors
            </Link>
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