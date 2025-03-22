import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';

const loadingAnimation = require('../assets/animations/loading.json');

export function LoadingAnimation() {
  return (
    <View style={styles.container}>
      <LottieView
        source={loadingAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 9999,
  },
  animation: {
    width: 120,
    height: 120,
  },
});