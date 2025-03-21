import React, { createContext, useContext, useState } from 'react';

interface Tab {
  id: string;
  url: string;
}

interface TabsContextType {
  tabs: Tab[];
  activeTab: string;
  addTab: () => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTabUrl: (id: string, url: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function TabsProvider({ children }: { children: React.ReactNode }) {
  const [tabs, setTabs] = useState<Tab[]>([{ id: '1', url: 'https://google.com' }]);
  const [activeTab, setActiveTab] = useState('1');

  const addTab = () => {
    const newTab = { id: Date.now().toString(), url: 'https://google.com' };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const removeTab = (id: string) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter(tab => tab.id !== id);
      setTabs(newTabs);
      if (activeTab === id) {
        setActiveTab(newTabs[newTabs.length - 1].id);
      }
    }
  };

  const updateTabUrl = (id: string, url: string) => {
    setTabs(tabs.map(tab => tab.id === id ? { ...tab, url } : tab));
  };

  return (
    <TabsContext.Provider value={{ tabs, activeTab, addTab, removeTab, setActiveTab, updateTabUrl }}>
      {children}
    </TabsContext.Provider>
  );
}

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('useTabs must be used within a TabsProvider');
  return context;
};