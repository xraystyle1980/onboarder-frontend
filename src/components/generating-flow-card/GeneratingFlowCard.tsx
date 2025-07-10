import React from 'react';
import { Icon } from '@iconify/react';
import { Card, CardBody } from '@heroui/react';
import { LoadingSpinner } from '../LoadingSpinner';

interface Step {
  id?: string;
  message?: string;
}

interface GeneratingFlowCardProps {
  prompt?: string;
  steps: Step[];
  currentProgressMessage?: string;
}

export const GeneratingFlowCard: React.FC<GeneratingFlowCardProps> = ({ 
  prompt, 
  steps,
  currentProgressMessage
}) => {
  console.log('Rendering GeneratingFlowCard with steps:', steps);
  
  return (
    <section className="container mx-auto">
      <Card className="gradient-bg-card rounded-3xl max-w-5xl mx-auto mb-8 flex flex-col items-center relative border border-border">
        <CardBody className="p-0 w-full">
          {/* Prompt Section */}
          <div className="flex flex-row items-center justify-between w-full p-8 pb-6 gap-4">
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Icon icon="mdi:format-quote-open" width={20} height={20} className="text-sky-400" />
                <span className="uppercase tracking-wide text-xs text-sky-400 font-semibold">Prompt</span>
              </div>
              <p className="mb-0 text-lg md:text-xl font-normal text-foreground leading-snug break-words">
                {prompt?.charAt(0).toUpperCase() + prompt?.slice(1)}
              </p>
            </div>
            <div className="flex flex-row items-center gap-3 ml-4 shrink-0">
              <LoadingSpinner size="lg" />
              <div className="flex flex-col items-start">
                {currentProgressMessage && (
                  <span className="animated-gradient-text font-medium">
                    {currentProgressMessage}
                  </span>
                )}
                {steps.map((step, idx) => (
                  <div key={step.id || idx}>
                    <span className="animated-gradient-text">
                      {step.message || '...'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}; 