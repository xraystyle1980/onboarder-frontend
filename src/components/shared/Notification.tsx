import { ReactNode } from 'react';

interface NotificationProps {
  type: 'success' | 'error' | 'info' | 'warning';
  children: ReactNode;
  className?: string;
}

export default function Notification({ type, children, className = '' }: NotificationProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-950/40 text-green-500 border border-green-800';
      case 'error':
        return 'bg-red-950/40 text-red-500 border border-red-800';
      case 'warning':
        return 'bg-yellow-950/40 text-yellow-500 border border-yellow-800';
      case 'info':
        return 'bg-blue-950/40 text-blue-500 border border-blue-800';
      default:
        return 'bg-gray-950/40 text-gray-500 border border-gray-800';
    }
  };

  return (
    <div 
      className={`text-center text-sm mt-4 p-3 rounded-md ${getTypeStyles()} ${className}`} 
      style={{ pointerEvents: 'all', position: 'relative', zIndex: 9999 }}
    >
      <div style={{ pointerEvents: 'all' }}>
        {children}
      </div>
    </div>
  );
}