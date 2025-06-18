import { useEffect } from 'react';

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const color = type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-blue-500';

  return (
    <div className={`fixed top-6 right-6 z-50 px-4 py-3 rounded shadow text-white ${color}`}>
      {message}
    </div>
  );
} 