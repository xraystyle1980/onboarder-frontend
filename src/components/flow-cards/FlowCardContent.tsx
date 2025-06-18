import React from 'react';
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface FlowCardContentProps {
  headline: string;
  subtext: string;
  cta?: string;
  ctaType?: string;
  uxPattern: string;
  patternPurpose: string;
  layoutPurpose: string;
}

export const FlowCardContent: React.FC<FlowCardContentProps> = React.memo(({
  headline,
  subtext,
  cta,
  ctaType,
  uxPattern,
  patternPurpose,
  layoutPurpose
}) => {
  return (
    <section className="p-4 border-b rounded-b-3xl border-gray-200 bg-white">
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
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
            {ctaType && (
              <span className="text-gray-400">({ctaType})</span>
            )}
          </Button>
        </div>
      )}

    </section>
  );
});

FlowCardContent.displayName = 'FlowCardContent'; 