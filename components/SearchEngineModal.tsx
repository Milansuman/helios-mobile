import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import { useTheme } from "@/app/context/ThemeContext";
import { Search, Globe, Brain } from "lucide-react-native";

interface SearchEngineModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (engine: 'google' | 'bing' | 'perplexity') => void;
}

export function SearchEngineModal({ visible, onClose, onSelect }: SearchEngineModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const engines = [
    { id: 'google' as const, name: 'Google', icon: Search },
    { id: 'bing' as const, name: 'Bing', icon: Globe },
    { id: 'perplexity' as const, name: 'Perplexity', icon: Brain },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[
          styles.modal,
          { backgroundColor: isDark ? '#141414' : '#FFFFFF' }
        ]}>
          <View style={styles.logoContainer}>
            <Search size={28} color={isDark ? '#FFFFFF' : '#000000'} />
          </View>
          <Text style={[
            styles.title,
            { color: isDark ? '#FFFFFF' : '#000000' }
          ]}>
            Joyful and productive browsing
          </Text>
          <Text style={[
            styles.subtitle,
            { color: isDark ? '#999999' : '#666666' }
          ]}>
            Choose your preferred search engine
          </Text>
          <View style={styles.engineList}>
            {engines.map(({ id, name, icon: Icon }) => (
              <Pressable
                key={id}
                style={({ pressed }) => [
                  styles.engineButton,
                  {
                    backgroundColor: isDark 
                      ? pressed ? '#2A2A2A' : '#1E1E1E'
                      : pressed ? '#F5F5F5' : '#FFFFFF',
                    borderColor: isDark ? '#333333' : '#EEEEEE',
                  }
                ]}
                onPress={() => {
                  onSelect(id);
                  onClose();
                }}
              >
                <Icon 
                  size={20} 
                  color={isDark ? '#FFFFFF' : '#000000'} 
                  style={styles.engineIcon}
                />
                <Text style={[
                  styles.engineText,
                  { color: isDark ? '#FFFFFF' : '#000000' }
                ]}>
                  Continue with {name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'left',
  },
  engineList: {
    gap: 12,
  },
  engineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  engineIcon: {
    marginRight: 12,
  },
  engineText: {
    fontSize: 15,
    fontWeight: '500',
  },
});