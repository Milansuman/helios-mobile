import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import { useTabs } from '@/app/context/TabsContext';
import { useTheme } from '@/app/context/ThemeContext';
import { X } from 'lucide-react-native';

interface TabGridProps {
  visible: boolean;
  onClose: () => void;
}

export function TabGrid({ visible, onClose }: TabGridProps) {
  const { tabs, activeTab, setActiveTab, removeTab } = useTabs();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: isDark ? '#141414' : '#FFFFFF' }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Open Tabs ({tabs.length})
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={isDark ? '#FFFFFF' : '#000000'} />
          </TouchableOpacity>
        </View>
        <View style={styles.grid}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabCard, { backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5' }]}
              onPress={() => handleTabPress(tab.id)}
            >
              <View style={styles.tabContent}>
                <Text 
                  style={[styles.tabUrl, { color: isDark ? '#FFFFFF' : '#000000' }]} 
                  numberOfLines={1}
                >
                  {new URL(tab.url).hostname}
                </Text>
                <TouchableOpacity
                  style={styles.closeTab}
                  onPress={() => removeTab(tab.id)}
                >
                  <X size={16} color={isDark ? '#FFFFFF' : '#000000'} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  tabCard: {
    width: cardWidth,
    height: cardWidth * 1.2,
    borderRadius: 12,
    padding: 12,
  },
  tabContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  tabUrl: {
    fontSize: 14,
    fontWeight: '500',
  },
  closeTab: {
    alignSelf: 'flex-end',
    padding: 4,
  },
});