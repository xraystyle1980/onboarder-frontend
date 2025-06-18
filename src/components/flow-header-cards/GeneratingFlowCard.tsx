import React from 'react';
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
    <div className="bg-white rounded-xl shadow p-10 max-w-2xl mx-auto my-8 flex flex-col items-center">
      <h4 className="text-2xl text-center mb-6 mt-1">{prompt?.charAt(0).toUpperCase() + prompt?.slice(1)}</h4>
      <div className="my-4"><LoadingSpinner size="lg" /></div>
      <div className="w-full mt-0">
        {currentProgressMessage && (
          <div className="flex justify-center items-center gap-2">
            <span className="animated-gradient-text">{currentProgressMessage}</span>
          </div>
        )}
        {steps.map((step, idx) => (
          <div key={step.id || idx} className="flex justify-center items-center gap-2">
            <p><span className="animated-gradient-text">{step.message || '...'}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}; 