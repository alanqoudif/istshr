'use client';

import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

interface BetaNotificationProps {
  language?: 'ar' | 'en';
}

/**
 * Beta notification component that displays a banner at the bottom of the screen
 */
const BetaNotification: React.FC<BetaNotificationProps> = ({ language = 'en' }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if notification has been dismissed before
    const dismissed = localStorage.getItem('beta_notification_dismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('beta_notification_dismissed', 'true');
  };

  if (!isVisible) return null;

  const messages = {
    ar: {
      text: 'هذا الموقع في مرحلة تجريبية (بيتا). بعض الميزات قد لا تعمل بشكل كامل.',
      dismiss: 'إغلاق'
    },
    en: {
      text: 'This site is in beta. Some features may not be fully functional.',
      dismiss: 'Dismiss'
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-3 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <p className={language === 'ar' ? 'text-right' : 'text-left'}>
          {messages[language].text}
        </p>
        <button
          onClick={handleDismiss}
          className="ml-4 px-3 py-1 bg-white text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50"
        >
          {messages[language].dismiss}
        </button>
      </div>
    </div>
  );
};

export default BetaNotification; 