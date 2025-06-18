import React from 'react';
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { OnboardingStep } from '../../types';

interface FlowCardActionsProps {
  step: OnboardingStep;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function FlowCardActions({ step, onEdit, onDelete }: FlowCardActionsProps) {
  return (
    <div className="flex justify-end gap-2 mt-4">
      {onEdit && (
        <Button
          variant="light"
          color="default"
          size="sm"
          onPress={onEdit}
          startContent={<Icon icon="lucide:edit" className="h-4 w-4" />}
        >
          Edit
        </Button>
      )}
      {onDelete && (
        <Button
          variant="light"
          color="danger"
          size="sm"
          onPress={onDelete}
          startContent={<Icon icon="lucide:trash-2" className="h-4 w-4" />}
        >
          Delete
        </Button>
      )}
    </div>
  );
} 