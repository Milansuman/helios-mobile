import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export function GradientLoader() {
  const translateX = useRef(new Animated.Value(-300)).current;
  
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: Dimensions.get('window').width,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -300,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    
    animation.start();
    
    return () => animation.stop();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.gradient, { transform: [{ translateX }] }]}>
        <LinearGradient
          colors={['#00000000', '#ffffff50', '#00000000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientContent}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 2,
    backgroundColor: '#00000010',
    overflow: 'hidden',
  },
  gradient: {
    height: '100%',
    width: 300,
  },
  gradientContent: {
    flex: 1,
  },
});