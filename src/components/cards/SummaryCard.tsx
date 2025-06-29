import React from 'react';
import { Card, CardBody } from "@heroui/react";
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
    <Card className={`bg-card text-card-foreground border border-border ${className}`}>
      <CardBody className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Icon icon={icon} width={20} height={20} className={`${iconColor} mr-1`} />
          <div className="font-semibold text-foreground">{label}</div>
        </div>
        <div className="text-foreground">
          {children}
        </div>
      </CardBody>
    </Card>
  );
}; 