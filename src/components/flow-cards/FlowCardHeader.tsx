import React from 'react';
import { Accordion, AccordionItem } from "@heroui/react";
import { ModalType } from '../../types';

interface FlowCardHeaderProps {
  stepNumber: number;
  layoutType: string;
  patternPurpose: string;
  layoutPurpose: string;
  modalType?: ModalType;
}

// Utility to replace underscores and capitalize each word
function formatLayoutType(str: string) {
  return str
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

// Utility to get background color based on layout type
function getLayoutBackgroundColor(layoutType: string): string {
  const colorMap: { [key: string]: string } = {
    'full_screen': 'bg-blue-50',
    'modal_form': 'bg-green-50',
    'tooltip_overlay': 'bg-purple-50',
    'split_screen': 'bg-orange-50',
    'swipeable_cards': 'bg-indigo-50'
  };

  // Convert layoutType to lowercase for case-insensitive matching
  const normalizedType = layoutType.toLowerCase();
  
  // Try exact match first
  if (colorMap[normalizedType]) {
    return colorMap[normalizedType];
  }
  
  // Try partial matching for layout types that might contain these keywords
  for (const [key, color] of Object.entries(colorMap)) {
    if (normalizedType.includes(key)) {
      return color;
    }
  }
  
  // Default fallback
  return 'bg-slate-50';
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
  let modalDescription = '';
  if (modalType) {
    modalDescription = ` This step uses a ${getModalTypeLabel(modalType).toLowerCase()} to ${
      modalType === 'welcome' ? 'introduce the user to a new section or feature' :
      modalType === 'form' ? 'collect user input in a focused overlay' :
      modalType === 'confirmation' ? 'confirm user actions or display success states' :
      modalType === 'summary' ? 'provide an overview of completed actions or selections' :
      'interact with the user'
    }.`;
  }
  return layoutPurpose + modalDescription;
}

export const FlowCardHeader: React.FC<FlowCardHeaderProps> = React.memo(({ 
  stepNumber, 
  layoutType,
  patternPurpose,
  layoutPurpose,
  modalType
}) => {
  const layoutBackgroundColor = getLayoutBackgroundColor(layoutType);
  const combinedTitle = getCombinedTitle(layoutType, modalType);
  const combinedDescription = getCombinedDescription(layoutPurpose, modalType);
  
  return (
    <div className="flex flex-col w-full bg-red-400 px-0 gap-0 py-0">
      <Accordion isCompact variant="light" showDivider={true} className="w-full px-0">
        <AccordionItem 
          key="step" 
          title={`Step ${stepNumber}`}
          classNames={{
            base: "bg-slate-200",
            heading: "my-0 px-4",
            title: "text-slate-700 text-sm",
            content: "text-sm text-slate-600 pt-1 pb-3 px-5"
          }}
        >
          <div>{patternPurpose}</div>
        </AccordionItem>
      </Accordion>

      <Accordion isCompact variant="light" showDivider={true} className="w-full px-0">
        <AccordionItem 
          key="layout" 
          title={combinedTitle}
          classNames={{
            base: layoutBackgroundColor,
            heading: "my-0 px-4",
            title: "text-slate-700 text-sm",
            content: "text-sm text-slate-600 pt-1 pb-3 px-5"
          }}
        >
          <div>{combinedDescription}</div>
        </AccordionItem>
      </Accordion>
    </div>
  );
});

FlowCardHeader.displayName = 'FlowCardHeader'; 