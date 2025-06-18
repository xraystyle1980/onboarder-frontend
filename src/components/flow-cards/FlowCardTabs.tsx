import React from 'react';
import { Tabs, Tab } from "@heroui/react";

interface FlowCardTabsProps {
  selectedTab: string;
  onTabChange: (key: string) => void;
  uxGoal: string;
  userAction: string;
  rationale: string;
}

export const FlowCardTabs: React.FC<FlowCardTabsProps> = React.memo(({
  selectedTab,
  onTabChange,
  uxGoal,
  userAction,
  rationale
}) => {
  const renderTabContent = () => {
    switch (selectedTab) {
      case "goal":
        return (
          <p className="text-gray-700 text-base">
            {uxGoal}
          </p>
        );
      case "action":
        return (
          <p className="text-gray-700 text-base">
            {userAction}
          </p>
        );
      case "rationale":
        return (
          <p className="text-gray-700 text-base">
            {rationale}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Tabs
        selectedKey={selectedTab}
        onSelectionChange={(key) => onTabChange(key as string)}
        aria-label="Onboarding step details"
        color="primary"
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider justify-center",
          cursor: "w-full bg-purple-600",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-purple-600 font-semibold",
        }}
      >
        <Tab key="goal" title="Goal" />
        <Tab key="action" title="Action" />
        <Tab key="rationale" title="Rationale" />
      </Tabs>
      <div className="mt-4">
        {renderTabContent()}
      </div>
    </>
  );
});

FlowCardTabs.displayName = 'FlowCardTabs'; 