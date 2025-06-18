import React from 'react';
import { Icon } from '@iconify/react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  // Temporary: Show several loading icons for preview
  const icons = [
    { name: 'lucide:loader' },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {icons.map(icon => (
        <div key={icon.name} className="flex items-center">
          <Icon
            icon={icon.name}
            className={`${sizeClasses[size]} animate-spin text-primary`}
          />
          <span className="text-xs text-muted-foreground">{icon.label}</span>
        </div>
      ))}
    </div>
  );
}; 