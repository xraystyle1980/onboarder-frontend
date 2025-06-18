import React from 'react';
import { Chip } from "@heroui/react";
import { getFlowCardStyle } from '../../utils/flowCardStyles';

interface FlowCardHeaderProps {
  stepNumber: number;
  layout: string;
}

export const FlowCardHeader: React.FC<FlowCardHeaderProps> = React.memo(({ 
  stepNumber, 
  layout
}) => {
  const styles = getFlowCardStyle(layout);

  return (
    <div className="flex items-center gap-2 mb-4">
      <Chip {...styles.stepChip}>
        Step {stepNumber}
      </Chip>
      <Chip {...styles.typeChip}>
        {layout} Screen
      </Chip>
    </div>
  );
});

FlowCardHeader.displayName = 'FlowCardHeader'; 