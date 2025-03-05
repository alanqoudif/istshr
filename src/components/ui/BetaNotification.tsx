'use client';

import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

interface BetaNotificationProps {
  language?: 'ar' | 'en';
}

const BetaNotification: React.FC<BetaNotificationProps> = ({ language = 'ar' }) => {
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

  // If notification has been dismissed, don't render anything
  if (!isVisible) {
    return null;
  }

  const messages = {
    ar: {
      title: 'نسخة تجريبية',
      message: 'هذا الموقع في مرحلة تجريبية وقد تظهر بعض الأخطاء. نعمل على تحسينه باستمرار.',
      dismiss: 'إغلاق'
    },
    en: {
      title: 'Beta Version',
      message: 'This site is in beta and may contain some errors. We are continuously working to improve it.',
      dismiss: 'Dismiss'
    }
  };

  const content = messages[language];
  const isArabic = language === 'ar';

  return (
    <div 
      className={`fixed bottom-4 ${isArabic ? 'right-4' : 'left-4'} z-50 max-w-md bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg transition-all duration-300 ease-in-out`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <FaExclamationTriangle className="h-5 w-5 text-yellow-600" />
          </div>
          <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 pt-0.5`}>
            <h3 className="text-sm font-medium text-yellow-800">
              {content.title}
            </h3>
            <div className="mt-1 text-sm text-yellow-700">
              <p>{content.message}</p>
            </div>
          </div>
          <div className="flex-shrink-0 flex">
            <button
              type="button"
              className={`inline-flex text-yellow-600 hover:text-yellow-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
              onClick={handleDismiss}
            >
              <span className="sr-only">{content.dismiss}</span>
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaNotification; 