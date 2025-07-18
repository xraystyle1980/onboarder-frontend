import { useEffect } from 'react';
import Notification from './Notification';

interface ToastProps {
  message: string;
  type?: 'info' | 'success' | 'error' | 'warning';
  onClose: () => void;
  className?: string;
}

export default function Toast({ message, type = 'info', onClose, className = '' }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] ${className}`}>
      <Notification type={type} className="mt-0 shadow-lg">
        {message}
      </Notification>
    </div>
  );
} 