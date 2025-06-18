import { useState, useCallback } from 'react';

export const useFlowCardTabs = () => {
  const [selectedTabs, setSelectedTabs] = useState<{ [key: string]: string }>({});

  const handleTabChange = useCallback((stepId: string, key: string) => {
    setSelectedTabs((prev) => ({ ...prev, [stepId]: key }));
  }, []);

  const getSelectedTab = useCallback((stepId: string) => {
    return selectedTabs[stepId] || "goal";
  }, [selectedTabs]);

  return {
    selectedTabs,
    handleTabChange,
    getSelectedTab,
  };
}; 