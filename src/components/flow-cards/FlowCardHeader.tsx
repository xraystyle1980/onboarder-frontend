import React from 'react';
import { Accordion, AccordionItem } from "@heroui/react";
import { ModalType } from '../../types';
import { accordionItemClassNames } from '../shared/accordionTheme';
import { IconBox } from '../shared/IconBox';
import { Icon } from '@iconify/react';

interface FlowCardHeaderProps {
  stepNumber: number;
  layoutType: string;
  patternPurpose: string;
  layoutPurpose: string;
  modalType?: ModalType;
  rationale?: string;
  uxGoal?: string;
  userAction?: string;
}

// Utility to replace underscores and capitalize each word
function formatLayoutType(str: string) {
  return str
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

// Utility to get a human-readable label for modal type
function getModalTypeLabel(type: ModalType) {
  const labels = {
    welcome: 'Welcome Modal',
    form: 'Input Form Modal',
    confirmation: 'Confirmation Modal',
    summary: 'Summary Modal'
  };
  return labels[type] || type;
}

// Utility to get combined title for layout with modal type
function getCombinedTitle(layoutType: string, modalType?: ModalType) {
  let baseTitle = formatLayoutType(layoutType);
  
  // Remove "Form" from "Modal Form" to make it cleaner
  if (baseTitle === 'Modal Form') {
    baseTitle = 'Modal';
  }
  
  if (modalType) {
    return `${baseTitle} - ${getModalTypeLabel(modalType)}`;
  }
  return baseTitle;
}

// Utility to get combined description for layout with modal type
function getCombinedDescription(layoutPurpose: string, modalType?: ModalType) {
  // For modal forms, prioritize the modal description since it's more specific
  if (modalType) {
    const modalDescription = `This step uses a ${getModalTypeLabel(modalType).toLowerCase()} to ${
      modalType === 'welcome' ? 'introduce the user to a new section or feature' :
      modalType === 'form' ? 'collect user input in a focused overlay' :
      modalType === 'confirmation' ? 'confirm user actions or display success states' :
      modalType === 'summary' ? 'provide an overview of completed actions or selections' :
      'interact with the user'
    }.`;
    
    // If layoutPurpose provides additional context that doesn't conflict, append it
    if (layoutPurpose && !layoutPurpose.includes('modal') && !layoutPurpose.includes('overlay')) {
      return `${modalDescription} ${layoutPurpose}`;
    }
    
    return modalDescription;
  }
  
  return layoutPurpose;
}

export const FlowCardHeader: React.FC<FlowCardHeaderProps> = React.memo(({ 
  stepNumber, 
  layoutType,
  patternPurpose,
  layoutPurpose,
  modalType,
  rationale,
  uxGoal,
  userAction
}) => {
  const combinedTitle = getCombinedTitle(layoutType, modalType);
  const combinedDescription = getCombinedDescription(layoutPurpose, modalType);
  
  return (
    <div className="flex flex-col w-full px-0 gap-0 py-0">
      <Accordion isCompact showDivider={true} className="w-full px-2">
        <AccordionItem 
          key="step" 
          title={`Step ${stepNumber}`}
          classNames={accordionItemClassNames}
        >
          {(patternPurpose || rationale) && (
            <div className="flex flex-col gap-2">
              {patternPurpose && <p className="text-muted-foreground text-sm">{patternPurpose}</p>}
              {rationale && <p className="text-muted-foreground text-sm">{rationale}</p>}
            </div>
          )}
        </AccordionItem>

        <AccordionItem 
          key="layout" 
          title={combinedTitle}
          classNames={accordionItemClassNames}
        >
          {(uxGoal || userAction) && (
            <ul className="space-y-4 text-sm text-muted-foreground">
              {uxGoal && (
                <li className="flex gap-4">
                  <IconBox
                    icon={<Icon icon="lucide:target" className="text-primary-500" width={20} height={20} />}
                    size={32}
                  />
                  <div className="flex flex-col">
                    <div className="text-foreground">Goal</div> 
                    <span className="text-muted-foreground">{uxGoal}</span>
                  </div>
                </li>
              )}
              {userAction && (
                <li className="flex gap-4">
                  <IconBox
                    icon={<Icon icon="lucide:mouse-pointer" className="text-primary-500" width={20} height={20} />}
                    size={32}
                  />
                  <div className="flex flex-col">
                    <div className="text-foreground">Action</div> 
                    <span className="text-muted-foreground">{userAction}</span>
                  </div>
                </li>
              )}
            </ul>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
});

FlowCardHeader.displayName = 'FlowCardHeader'; 