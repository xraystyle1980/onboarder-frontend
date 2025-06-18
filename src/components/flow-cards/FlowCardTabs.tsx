import React from 'react';
import { Tabs, Tab } from "@heroui/react";

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
  const renderTabContent = () => {
    switch (selectedTab) {
      case "goal":
        return (
          <p className="text-slate-700 text-sm">
            {uxGoal}
          </p>
        );
      case "action":
        return (
          <p className="text-slate-700 text-sm">
            {userAction}
          </p>
        );
      case "rationale":
        return (
          <p className="text-slate-700 text-sm">
            {rationale}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <section className="p-4 bg-slate-50">
      <Tabs
        selectedKey={selectedTab}
        onSelectionChange={(key) => onTabChange(key as string)}
        aria-label="Onboarding step details"
        color="primary"
        variant="solid"
        classNames={{
          tabList: "gap-2 w-full relative rounded-none border-divider justify-center bg-slate-100 rounded-xl",
          cursor: "w-full bg-white",
          tab: "max-w-fit px-3",
          tabContent: "group-data-[selected=true]:text-slate-600 text-sm",
        }}
      >
        <Tab key="goal" title="Goal" />
        <Tab key="action" title="Action" />
        <Tab key="rationale" title="Rationale" />
      </Tabs>
      <div className="mt-4">
        {renderTabContent()}
      </div>
    </section>
  );
});

FlowCardTabs.displayName = 'FlowCardTabs'; 