'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaUserMd } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { authService, initializeAuth } from '@/lib/auth';
import { UserRole } from '@/types';

// Form validation schema
const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
  role: z.enum(['USER', 'COUNSELLOR']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'USER',
    },
  });

  // Initialize auth service
  useEffect(() => {
    initializeAuth();
  }, []);

  // Handle form submission
  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if user already exists
      if (authService.userExists(data.email)) {
        setError('A user with this email already exists');
        setIsLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: data.role as UserRole,
      };

      // Add user and login
      const success = authService.addUser(data.email, data.password, data.name, data.role as UserRole);
      
      if (!success) {
        setError('Failed to create account. Please try again.');
        setIsLoading(false);
        return;
      }
      
      // Login the user
      const user = authService.login(data.email, data.password);
      
      if (!user) {
        setError('Account created but login failed. Please go to login page.');
        setIsLoading(false);
        return;
      }

      // Redirect based on user role
      if (data.role === 'COUNSELLOR') {
        router.push('/counsellor/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred during signup. Please try again.');
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            استشر
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to your existing account
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
                  label="Full Name"
                  type="text"
                  {...register('name')}
                  error={errors.name?.message}
                  leftIcon={<FaUser />}
                  fullWidth
                />
              </div>

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

              <div>
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                  leftIcon={<FaLock />}
                  rightIcon={
                    showConfirmPassword ? (
                      <FaEyeSlash
                        className="cursor-pointer text-gray-500"
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    ) : (
                      <FaEye
                        className="cursor-pointer text-gray-500"
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    )
                  }
                  fullWidth
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">I am a:</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="USER"
                      {...register('role')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Service Seeker</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="COUNSELLOR"
                      {...register('role')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Counsellor</span>
                  </label>
                </div>
                {errors.role && (
                  <p className="text-sm text-red-600">{errors.role.message}</p>
                )}
              </div>

              <div>
                <Button type="submit" isLoading={isLoading} fullWidth>
                  Create Account
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
          </CardContent>
        </Card>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 