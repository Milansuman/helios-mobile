import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useTabs } from '@/app/context/TabsContext';
import { useTheme } from '@/app/context/ThemeContext';
import { Plus, Grid } from 'lucide-react-native';

interface TabBarProps {
  onShowGrid: () => void;
}

export function TabBar({ onShowGrid }: TabBarProps) {
  const { tabs, activeTab, addTab, setActiveTab } = useTabs();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#141414' : '#FFFFFF' }]}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text 
              style={[styles.tabText, { color: isDark ? '#FFFFFF' : '#000000' }]} 
              numberOfLines={1}
            >
              {new URL(tab.url).hostname}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={addTab}>
          <Plus size={24} color={isDark ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onShowGrid}>
          <Grid size={24} color={isDark ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#00000010',
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    flex: 1,
    maxWidth: 150,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#00000010',
  },
  tabText: {
    fontSize: 14,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 8,
  },
  button: {
    padding: 8,
    borderRadius: 8,
  },
});