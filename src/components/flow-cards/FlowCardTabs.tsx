import React from 'react';

interface FlowCardTabsProps {
  selectedTab: string;
  onTabChange: (key: string) => void;
  uxGoal: string;
  userAction: string;
  rationale: string;
  uxPattern: string;
  patternPurpose: string;
  layoutType: string;
  layoutPurpose: string;
}

export const FlowCardTabs: React.FC<FlowCardTabsProps> = React.memo(({
  selectedTab,
  onTabChange,
  uxGoal,
  userAction,
  rationale,
  uxPattern,
  patternPurpose,
  layoutType,
  layoutPurpose
}) => {
  return (
    <></>
    // <section className="p-4">
    //   <ul className="space-y-4 text-lg text-muted-foreground">
    //     <li className="flex items-center gap-2 text-foreground">
    //       <span>Goal: {uxGoal}</span>
    //     </li>
    //     <li className="flex items-center gap-2 text-foreground">
    //       <span>Action: {userAction}</span>
    //     </li>
    //   </ul>
    // </section>
  );
});

FlowCardTabs.displayName = 'FlowCardTabs'; 


