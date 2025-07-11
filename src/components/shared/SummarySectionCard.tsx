import { Card, CardHeader, CardBody } from "@heroui/react";
import React from "react";

export const SummarySectionCard = ({
  icon,
  title,
  children,
  className = "",
  iconClass = "",
}: {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  iconClass?: string;
}) => (
  <Card className={`bg-card border border-border shadow-3xl rounded-xl p-6 ${className}`}>
    <CardHeader className="flex items-center gap-2 mb-2 p-0 bg-transparent border-none">
      {icon && icon}
      {title && <span className="text-foreground text-xl font-medium">{title}</span>}
    </CardHeader>
    <CardBody className="p-0">{children}</CardBody>
  </Card>
); 