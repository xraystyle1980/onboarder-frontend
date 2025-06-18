import React from 'react';
import { Card, CardBody } from "@heroui/react";
import { FlowCardHeader } from './FlowCardHeader';
import { FlowCardContent } from './FlowCardContent';
import { FlowCardTabs } from './FlowCardTabs';
import { FlowCardActions } from './FlowCardActions';
import { OnboardingStep, OnboardingFlow } from '../../types';

interface FlowCardProps {
  step: OnboardingStep;
  flow: OnboardingFlow;
  index: number;
  selectedTab: string;
  onTabChange: (key: string) => void;
}

export const FlowCard: React.FC<FlowCardProps> = React.memo(({ 
  step, 
  flow,
  index, 
  selectedTab, 
  onTabChange 
}) => {
  return (
    <Card className="min-w-[340px] max-w-[340px] border border-default-200 bg-slate-50 shadow-none">
      <CardBody className="p-0">
        <FlowCardHeader 
          stepNumber={index + 1} 
          layoutType={step.layoutType}
          patternPurpose={step.patternPurpose}
          layoutPurpose={step.layoutPurpose}
        />
        
        <FlowCardContent 
          headline={step.headline || step.stepName}
          subtext={step.subtext || step.rationale}
          cta={step.cta}
          ctaType={step.ctaType}
          uxPattern={step.uxPattern}
          patternPurpose={step.patternPurpose}
          layoutPurpose={step.layoutPurpose}
        />

        <FlowCardTabs
          selectedTab={selectedTab}
          onTabChange={onTabChange}
          uxGoal={step.uxGoal}
          userAction={step.userAction}
          rationale={step.rationale}
          uxPattern={step.uxPattern}
          patternPurpose={step.patternPurpose}
          layoutType={step.layoutType}
          layoutPurpose={step.layoutPurpose}
        />

      </CardBody>
    </Card>
  );
});

FlowCard.displayName = 'FlowCard'; 