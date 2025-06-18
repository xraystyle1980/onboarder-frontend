import React from 'react';
import { Accordion, AccordionItem } from "@heroui/react";

interface FlowCardHeaderProps {
  stepNumber: number;
  layoutType: string;
  patternPurpose: string;
  layoutPurpose: string;
}

// Utility to replace underscores and capitalize each word
function formatLayoutType(str: string) {
  return str
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

export const FlowCardHeader: React.FC<FlowCardHeaderProps> = React.memo(({ 
  stepNumber, 
  layoutType,
  patternPurpose,
  layoutPurpose
}) => {
  return (
    <div className="flex flex-col w-full bg-red-400 px-0 gap-0 py-0">
      
      
      <Accordion isCompact variant="light" showDivider={true} className="w-full px-0">
        <AccordionItem 
          key="step" 
          title={`Step ${stepNumber}`}
          classNames={{
            base: "bg-slate-100",         // Styles the outer wrapper of the item
            heading: "my-0 px-4",            // Styles the heading row
            title: "text-gray-700 text-sm",                  // Styles the title text
            content: "text-sm text-gray-600 pt-1 pb-3 px-5"     // Styles the content area
          }}
        >
          <div>{patternPurpose}</div>
        </AccordionItem>
      </Accordion>


      <Accordion isCompact variant="light" showDivider={true} className="w-full px-0">
        <AccordionItem 
          key="layout" 
          title={formatLayoutType(layoutType)}
          classNames={{
            base: "bg-slate-50",         // Styles the outer wrapper of the item
            heading: "my-0 px-4",            // Styles the heading row
            title: "text-gray-700 text-sm",                  // Styles the title text
            content: "text-sm text-gray-600 pt-1 pb-3 px-5"     // Styles the content area
          }}
          >
          <div>{layoutPurpose}</div>
        </AccordionItem>
      </Accordion>


    </div>
  );
});

FlowCardHeader.displayName = 'FlowCardHeader'; 