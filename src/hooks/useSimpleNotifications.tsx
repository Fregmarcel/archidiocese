"use client";

import { useState } from 'react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

export function useSimpleNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showSuccess = (title: string, message: string) => {
    const id = Date.now().toString();
    const notification = { id, type: 'success' as const, title, message };
    setNotifications(prev => [...prev, notification]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const showError = (title: string, message: string) => {
    const id = Date.now().toString();
    const notification = { id, type: 'error' as const, title, message };
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const NotificationContainer = () => (
    <div className="fixed top-4 right-4 z-[9999] space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`max-w-md w-full p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
            notification.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {notification.type === 'success' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{notification.title}</p>
              <p className="text-sm opacity-90">{notification.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return {
    showSuccess,
    showError,
    NotificationContainer,
  };
}
