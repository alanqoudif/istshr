'use client';

import { useEffect } from 'react';
import { initializeAuth } from '@/lib/auth';

export default function ClientAuthInitializer() {
  useEffect(() => {
    // Initialize authentication on the client side
    initializeAuth();
  }, []);

  // This component doesn't render anything
  return null;
} 