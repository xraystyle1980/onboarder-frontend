import { useState } from 'react';

export const useTabTransition = (initialTab: string) => {
  const [selectedTab, setSelectedTab] = useState(initialTab);

  const handleTabChange = (key: string) => {
    setSelectedTab(key);
  };

  const getTabTransitionClass = (tabKey: string) => {
    return `transition-opacity duration-300 ${
      selectedTab === tabKey
        ? 'opacity-100 relative z-10'
        : 'opacity-0 absolute top-0 left-0 w-full pointer-events-none'
    }`;
  };

  return {
    selectedTab,
    handleTabChange,
    getTabTransitionClass,
  };
}; 