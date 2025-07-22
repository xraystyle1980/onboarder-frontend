import React from 'react';
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LayoutType, ModalType, InputField } from '../../types';
import { IconBox } from '../shared/IconBox';

interface FlowCardContentProps {
  headline: string;
  subtitle: string;
  marketingCopy?: string;
  cta?: string;
  ctaType?: string;
  uxPattern: string;
  patternPurpose: string;
  layoutPurpose: string;
  layoutType: LayoutType;
  modalType?: ModalType;
  inputFields?: InputField[];
  uxGoal?: string;
  userAction?: string;
}

export const FlowCardContent: React.FC<FlowCardContentProps> = React.memo(({
  headline,
  subtitle,
  marketingCopy,
  cta,
  ctaType,
  uxPattern,
  patternPurpose,
  layoutPurpose,
  layoutType,
  modalType,
  inputFields,
  uxGoal,
  userAction
}) => {
  return (
    <section className="p-4 bg-card flex flex-col justify-center flex-1">
      <div>
        <h3 className="text-2xl font-semibold text-foreground">
          {headline}
        </h3>
        <h4 className="text-foreground text-base mb-4">
          {subtitle}
        </h4>
        {marketingCopy && layoutType !== 'modal_form' && (
          <p className="text-muted-foreground text-sm mb-4">
            {marketingCopy}
          </p>
        )}

        {/* Display input fields for modal forms */}
        {layoutType === 'modal_form' && inputFields && inputFields.length > 0 && (
          <div className="mb-4">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground mb-2">Input Fields</p>
              {inputFields.map((field, index) => (
                <div key={index} className="flex-1 items-start gap-2 text-sm">
                  <div className="border border-border bg-black/50 rounded-lg p-2 max-w-full">
                    <span className="font-medium text-foreground">{field.label}</span>
                    {field.type && <span className="text-muted-foreground text-xs ml-2">({field.type})</span>}
                    {(field.placeholder || typeof field === 'string' || field.label) && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Placeholder: "{field.placeholder || `Enter ${(typeof field === 'string' ? field : field.label).toLowerCase()}`}"
                      </div>
                    )}
                    {field.options && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Options: {field.options.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
                <span className="text-muted-foreground">({ctaType})</span>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
});

FlowCardContent.displayName = 'FlowCardContent'; 