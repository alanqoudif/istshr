'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaUserMd, FaLock, FaComments, FaUsers, FaChevronRight } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { authService } from '@/lib/auth';
import { AuthUser } from '@/lib/auth';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  // Features of the platform
  const features = [
    {
      icon: <FaUserMd className="h-8 w-8 text-blue-500" />,
      title: 'Expert Counsellors',
      description: 'Connect with verified professionals across various fields of expertise.',
    },
    {
      icon: <FaLock className="h-8 w-8 text-blue-500" />,
      title: 'Private & Secure',
      description: 'End-to-end encryption and private mode for confidential consultations.',
    },
    {
      icon: <FaComments className="h-8 w-8 text-blue-500" />,
      title: 'Flexible Sessions',
      description: 'Choose between text, audio, or video consultations based on your comfort.',
    },
    {
      icon: <FaUsers className="h-8 w-8 text-blue-500" />,
      title: 'Community Support',
      description: 'Join our community to share experiences and learn from others.',
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote: 'استشر helped me navigate a difficult career transition with expert guidance.',
      author: 'Ahmed K.',
      role: 'Career Guidance Client',
    },
    {
      quote: 'The private mode feature gave me the confidence to discuss sensitive family matters.',
      author: 'Fatima M.',
      role: 'Family Counselling Client',
    },
    {
      quote: 'As a counsellor, this platform has allowed me to help more people than ever before.',
      author: 'Dr. Nasser A.',
      role: 'Mental Health Counsellor',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                استشر - Your Digital Counselling Platform
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Connect with expert counsellors for guidance and support in various aspects of your life.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {currentUser ? (
                  <Link href="/dashboard">
                    <Button size="lg">Go to Dashboard</Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/auth/signup">
                      <Button size="lg">Get Started</Button>
                    </Link>
                    <Link href="/auth/login">
                      <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-700">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-xl">
                  <div className="flex justify-center mb-6">
                    <div className="text-white text-center">
                      <h3 className="text-xl font-semibold mb-2">Professional Guidance</h3>
                      <p className="text-blue-100">Connect with experts who understand your needs</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 rounded-lg p-4 text-center">
                      <FaUserMd className="h-8 w-8 mx-auto text-white mb-2" />
                      <p className="text-sm text-white">Expert Counsellors</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4 text-center">
                      <FaLock className="h-8 w-8 mx-auto text-white mb-2" />
                      <p className="text-sm text-white">Secure Sessions</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4 text-center">
                      <FaComments className="h-8 w-8 mx-auto text-white mb-2" />
                      <p className="text-sm text-white">Multiple Formats</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4 text-center">
                      <FaUsers className="h-8 w-8 mx-auto text-white mb-2" />
                      <p className="text-sm text-white">Community Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose استشر?</h2>
            <p className="mt-4 text-xl text-gray-600">
              Our platform offers a comprehensive approach to digital counselling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">
              Getting the support you need is simple and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4 text-2xl font-bold text-blue-600">
                1
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Create an Account</h3>
              <p className="text-gray-600">Sign up and complete your profile to get personalized recommendations.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4 text-2xl font-bold text-blue-600">
                2
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Find a Counsellor</h3>
              <p className="text-gray-600">Browse our network of experts and choose the right match for your needs.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4 text-2xl font-bold text-blue-600">
                3
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Session</h3>
              <p className="text-gray-600">Book and attend sessions through text, audio, or video calls.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/counsellors">
              <Button size="lg" rightIcon={<FaChevronRight />}>
                Browse Counsellors
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-xl text-gray-600">
              Real experiences from people who have used استشر
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="text-xl text-gray-600 mb-4">"{testimonial.quote}"</div>
                  <div className="font-medium text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Join thousands of users who have found guidance and support through استشر.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {currentUser ? (
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Create an Account
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                    Learn More
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">استشر</h3>
              <p className="text-gray-400">
                Your trusted platform for digital counselling and expert guidance.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/counsellors" className="text-gray-400 hover:text-white">Our Counsellors</Link></li>
                <li><Link href="/community" className="text-gray-400 hover:text-white">Community</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} استشر. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
