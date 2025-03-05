'use client';

import React, { useState } from 'react';
import { FaLock, FaLockOpen, FaInfoCircle } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface PrivateModeProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function PrivateMode({ isEnabled, onToggle }: PrivateModeProps) {
  const [showInfo, setShowInfo] = useState(false);

  const togglePrivateMode = () => {
    onToggle(!isEnabled);
  };

  return (
    <div className="relative">
      <div className={`flex items-center justify-between p-2 rounded-md ${isEnabled ? 'bg-blue-50' : 'bg-gray-50'}`}>
        <div className="flex items-center">
          {isEnabled ? (
            <FaLock className="text-blue-600 mr-2" />
          ) : (
            <FaLockOpen className="text-gray-500 mr-2" />
          )}
          <span className={`text-sm font-medium ${isEnabled ? 'text-blue-700' : 'text-gray-700'}`}>
            {isEnabled ? 'Private Mode Enabled' : 'Private Mode Disabled'}
          </span>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <FaInfoCircle className="h-4 w-4" />
          </button>
        </div>
        <Button
          size="sm"
          variant={isEnabled ? 'default' : 'outline'}
          onClick={togglePrivateMode}
        >
          {isEnabled ? 'Disable' : 'Enable'}
        </Button>
      </div>

      {showInfo && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-10 shadow-lg">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">About Private Mode</h4>
            <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4">
              <li>Messages are end-to-end encrypted</li>
              <li>Messages are automatically deleted after 24 hours</li>
              <li>Messages cannot be copied or saved</li>
              <li>Screenshots are disabled (where supported)</li>
              <li>No message history is stored on our servers</li>
            </ul>
            <div className="mt-3 text-xs text-gray-500">
              Private mode is recommended for sensitive discussions that require additional confidentiality.
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="mt-2 w-full"
              onClick={() => setShowInfo(false)}
            >
              Close
            </Button>
          </CardContent>
        </Card>
      )}

      {isEnabled && (
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <div className="text-xs text-blue-600">
              <span className="font-medium">Auto-delete in 24 hours</span>
            </div>
            <div className="text-xs text-blue-600">
              <span className="font-medium">End-to-end encrypted</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 