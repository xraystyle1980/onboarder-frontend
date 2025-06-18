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
    <Card className="min-w-[340px] max-w-[340px] border border-default-200">
      <CardBody className="p-6">
        <FlowCardHeader 
          stepNumber={index + 1} 
          layout={step.layout}
        />
        
        <FlowCardContent 
          headline={step.headline || step.stepName}
          subtext={step.subtext || step.rationale}
          cta={step.cta}
          ctaType={step.ctaType}
          pattern={step.pattern}
        />

        <FlowCardTabs
          selectedTab={selectedTab}
          onTabChange={onTabChange}
          uxGoal={step.uxGoal}
          userAction={step.userAction}
          rationale={step.rationale}
        />

      </CardBody>
    </Card>
  );
});

FlowCard.displayName = 'FlowCard'; 