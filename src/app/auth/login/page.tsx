'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { authService, initializeAuth } from '@/lib/auth';

// Form validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Initialize auth service
  useEffect(() => {
    initializeAuth();
    
    // For debugging - log users in localStorage
    if (typeof window !== 'undefined') {
      console.log('Users in localStorage:', authService.getUsers());
    }
  }, []);

  // Create admin user function
  const createAdminUser = () => {
    const adminEmail = 'admin@istashr.com';
    const adminPassword = 'Istashr@2025';
    
    // Force create admin user
    const users = authService.getUsers();
    const userKey = adminEmail.toLowerCase();
    
    // Remove existing admin if exists
    if (users[userKey]) {
      // Clear localStorage and recreate
      if (typeof window !== 'undefined') {
        localStorage.removeItem('istashr_users');
      }
    }
    
    // Add admin user
    const success = authService.addUser(
      adminEmail,
      adminPassword,
      'Admin User',
      'ADMIN'
    );
    
    if (success) {
      setError('Admin user created successfully. You can now login with admin@istashr.com / Istashr@2025');
    } else {
      setError('Failed to create admin user. Please try again.');
    }
    
    // Log users for debugging
    console.log('Users after admin creation:', authService.getUsers());
  };

  // Handle form submission
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Attempt to login
      const user = authService.login(data.email, data.password);
      
      if (!user) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      // Redirect based on user role
      if (user.role === 'ADMIN') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            استشر
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  label="Email Address"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                  leftIcon={<FaEnvelope />}
                  fullWidth
                />
              </div>

              <div>
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  error={errors.password?.message}
                  leftIcon={<FaLock />}
                  rightIcon={
                    showPassword ? (
                      <FaEyeSlash
                        className="cursor-pointer text-gray-500"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <FaEye
                        className="cursor-pointer text-gray-500"
                        onClick={togglePasswordVisibility}
                      />
                    )
                  }
                  fullWidth
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <Button type="submit" isLoading={isLoading} fullWidth>
                  Sign in
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" fullWidth>
                  Google
                </Button>
                <Button variant="outline" fullWidth>
                  Facebook
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Admin Tools</span>
                </div>
              </div>

              <div className="mt-6">
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={createAdminUser}
                >
                  Create Admin User
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 