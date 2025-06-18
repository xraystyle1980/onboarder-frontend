import React from 'react';
import { Icon } from "@iconify/react";

interface SummaryCardProps {
  icon: string;
  iconColor: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  icon,
  iconColor,
  label,
  children,
  className = ''
}) => {
  return (
    <div className={`summary-result-card ${className}`}>
      <div className="flex items-center gap-1 self-stretch">
        <Icon icon={icon} width={20} height={20} className={`summary-icon ${iconColor}`} />
        <div className="summary-label">{label}</div>
      </div>
      <div className="summary-content">
        {children}
      </div>
    </div>
  );
}; 