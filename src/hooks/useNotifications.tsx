"use client";

import React, { useState, useCallback } from 'react';
import Notification, { NotificationProps } from '../components/ui/Notification';

interface NotificationState {
  id: string;
  type: NotificationProps['type'];
  title: string;
  message: string;
  duration?: number;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationState[]>([]);

  const addNotification = useCallback((notification: Omit<NotificationState, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { ...notification, id }]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const showSuccess = useCallback((title: string, message: string, duration?: number) => {
    addNotification({ type: 'success', title, message, duration });
  }, [addNotification]);

  const showError = useCallback((title: string, message: string, duration?: number) => {
    addNotification({ type: 'error', title, message, duration });
  }, [addNotification]);

  const showWarning = useCallback((title: string, message: string, duration?: number) => {
    addNotification({ type: 'warning', title, message, duration });
  }, [addNotification]);

  const showInfo = useCallback((title: string, message: string, duration?: number) => {
    addNotification({ type: 'info', title, message, duration });
  }, [addNotification]);

  const NotificationContainer = useCallback(() => {
    return (
      <div className="fixed top-4 right-4 z-[9999] space-y-2">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            duration={notification.duration}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    );
  }, [notifications, removeNotification]);

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    NotificationContainer,
  };
}
