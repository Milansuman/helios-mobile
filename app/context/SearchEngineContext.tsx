import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SearchEngine = 'google' | 'bing' | 'perplexity' | { id: 'custom'; name: string; url: string };

interface SearchEngineContextType {
  searchEngine: SearchEngine | null;
  setSearchEngine: (engine: SearchEngine) => void;
}

const SearchEngineContext = createContext<SearchEngineContextType>({
  searchEngine: null,
  setSearchEngine: () => {}
});

export default function SearchEngineContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <SearchEngineProvider>
      {children}
    </SearchEngineProvider>
  );
}

export function SearchEngineProvider({ children }: { children: React.ReactNode }) {
  const [searchEngine, setSearchEngineState] = useState<SearchEngine | null>(null);

  const setSearchEngine = async (engine: SearchEngine) => {
    await AsyncStorage.setItem('preferred-search-engine', JSON.stringify(engine));
    setSearchEngineState(engine);
  };

  React.useEffect(() => {
    AsyncStorage.getItem('preferred-search-engine').then((engine) => {
      if (engine as SearchEngine) {
        setSearchEngineState(engine as SearchEngine);
      }
    });
  }, []);

  return (
    <SearchEngineContext.Provider value={{ searchEngine, setSearchEngine }}>
      {children}
    </SearchEngineContext.Provider>
  );
}

export const useSearchEngine = () => {
  const context = useContext(SearchEngineContext);
  if (!context) throw new Error('useSearchEngine must be used within a SearchEngineProvider');
  return context;
};