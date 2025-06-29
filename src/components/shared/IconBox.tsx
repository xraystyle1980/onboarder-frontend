import React from "react";

interface IconBoxProps {
  icon: React.ReactNode;
  className?: string;
  size?: number | string;
}

export const IconBox: React.FC<IconBoxProps> = ({ icon, className = "", size = 48 }) => (
  <div
    className={`flex items-center justify-center rounded-lg border border-sky-800 bg-indigo-950 shadow-md ${className}`}
    style={{ width: size, height: size, minWidth: size, minHeight: size }}
  >
    {icon}
  </div>
); 