import React from 'react';
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LayoutType, ModalType, InputField } from '../../types';

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
  inputFields
}) => {
  return (
    <section className="p-4 border-b rounded-b-3xl border-gray-200 bg-white">
      <h3 className="text-2xl font-semibold text-slate-900 mb-2">
        {headline}
      </h3>
      <h4 className="text-slate-700 text-sm mb-4">
        {subtitle}
      </h4>
      {marketingCopy && layoutType !== 'modal_form' && (
        <p className="text-slate-700 text-sm mb-4">
          {marketingCopy}
        </p>
      )}

      {/* Display input fields for modal forms */}
      {layoutType === 'modal_form' && inputFields && inputFields.length > 0 && (
        <div className="mb-4">
          <div className="bg-slate-50 rounded-lg p-3 space-y-2">
            <p className="text-xs font-medium text-slate-600 mb-2">Required Input Fields:</p>
            {inputFields.map((field, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <Icon 
                  icon={field.required ? "lucide:asterisk" : "lucide:circle-dot"} 
                  className={`w-3 h-3 mt-1 ${field.required ? 'text-red-500' : 'text-slate-400'}`} 
                />
                <div>
                  <span className="font-medium text-slate-700">{field.label}</span>
                  <span className="text-slate-500 text-xs ml-2">({field.type})</span>
                  {field.options && (
                    <div className="text-xs text-slate-500 mt-1">
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
              <span className="text-slate-400">({ctaType})</span>
            )}
          </Button>
        </div>
      )}

    </section>
  );
});

FlowCardContent.displayName = 'FlowCardContent'; 