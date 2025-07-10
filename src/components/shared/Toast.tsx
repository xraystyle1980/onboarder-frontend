import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'info' | 'success' | 'error';
  onClose: () => void;
  className?: string;
}

export default function Toast({ message, type = 'info', onClose, className = '' }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const color = type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-blue-500';

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded shadow text-white ${color} ${className}`}>
      {message}
    </div>
  );
} 