import React, { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";
import { DeviceMotion } from "expo-sensors";

import { Animated, Text, StyleSheet, SafeAreaView } from "react-native";

const quotes = ["hi", "hello", "how are you", "goodbye"];

const App = () => {
  const fadeAnim = useRef(new Animated.Value(0));

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim.current, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim.current, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true
    }).start();
  };

  const quoteIdx = useRef(0);
  const [quote, setQuote] = useState(quotes[quoteIdx.current]);
  const dataRef = useRef({ x: 0, y: 0, z: 0 });

  // fadeAnim will be used as the value for opacity. Initial Value: 0// fadeAnim will be used as the value for opacity. Initial Value: 0

  const generateRandomIndex = () => {
    const randomIdx = Math.floor(Math.random() * quotes.length);
    return randomIdx;
  };

  const onDeviceMotionChange = (event) => {
    const { x, y, z } = event.accelerationIncludingGravity;
    const { x: prevX, y: prevY, z: prevZ } = dataRef.current;
    const diffX = Math.abs(x - prevX);
    const diffY = Math.abs(y - prevY);
    const diffZ = Math.abs(z - prevZ);
    if (diffX > 8 || diffY > 8 || diffZ > 8) {
      // Stop listening to device motion
      DeviceMotion.removeAllListeners(onDeviceMotionChange);
      fadeOut();
      setTimeout(() => {
        const randomIdx = generateRandomIndex();
        setQuote(quotes[randomIdx]);
        // Start listening to device motion again
        DeviceMotion.addListener(onDeviceMotionChange);
      }, 3000);
    }
    dataRef.current = { x, y, z };
  };

  DeviceMotion.setUpdateInterval(250);
  useEffect(() => {
    DeviceMotion.addListener(onDeviceMotionChange);
    return () => {
      DeviceMotion.removeAllListeners(onDeviceMotionChange);
    };
  }, []);

  fadeIn();
  return (
    <SafeAreaView style={styles.container}>
      <Link style={{ position: "absolute", top: 1, left: 1 }} href="/">
        <Text style={{ color: "white" }}>Go back home</Text>
      </Link>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            // Bind opacity to animated value
            opacity: fadeAnim.current
          }
        ]}
      >
        <Text style={styles.fadingText}>{quote}</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000"
  },

  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16
  },
  fadingContainer: {},
  fadingText: {
    color: "#fff",
    fontSize: 28
  }
});

export default App;
