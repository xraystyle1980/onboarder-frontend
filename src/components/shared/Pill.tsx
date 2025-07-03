import React from "react";

export const Pill: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "", ...props }) => (
  <div
    className={`flex items-center justify-center rounded-full border border-solid border-slate-700 bg-slate-900 px-2 py-1 lg:px-4 lg:py-1.5 ${className}`}
    {...props}
  >
    <div className="flex items-center gap-2 text-xs lg:text-sm font-medium text-slate-400">
      {children}
    </div>
  </div>
); 