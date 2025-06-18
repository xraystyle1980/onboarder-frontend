import React from 'react';
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface FlowCardContentProps {
  headline: string;
  subtext: string;
  cta?: string;
  ctaType?: string;
  pattern?: string;
}

export const FlowCardContent: React.FC<FlowCardContentProps> = React.memo(({
  headline,
  subtext,
  cta,
  ctaType,
  pattern
}) => {
  return (
    <>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {headline}
      </h3>
      <p className="text-gray-700 text-base mb-4">
        {subtext}
      </p>

      {cta && (
        <div className="mb-6">
          <Button
            fullWidth
            variant="bordered"
            color="default"
            size="md"
            className="font-medium"
          >
            {cta}
          </Button>
          {ctaType && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              <em>☝️ When user clicks: <span className="font-medium text-gray-900">{ctaType}</span></em>
            </p>
          )}
        </div>
      )}

      {pattern && (
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Icon icon="lucide:info" width={16} height={16} className="mr-1" />
          <span>Pattern: {pattern}</span>
        </div>
      )}
    </>
  );
});

FlowCardContent.displayName = 'FlowCardContent'; 