import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Animated
} from "react-native";
import { router } from "expo-router";
import { useRef } from "react";

import zenText from "../assets/zen-text.png";
import zenRound from "../assets/zen-round.png";

export default function Page() {
  const fadeAnim = useRef(new Animated.Value(1));
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim.current, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.container, { opacity: fadeAnim.current }]}>
        <TouchableHighlight
          onPress={() => {
            // nav to next page, but first fade out the image
            fadeOut();
            setTimeout(() => {
              router.replace("/quotes");
            }, 2000);
          }}
        >
          <>
            <Image source={zenRound} style={styles.image} />
            <Image source={zenText} style={styles.image} />
          </>
        </TouchableHighlight>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000"
  },
  image: {
    width: 300,
    objectFit: "contain"
    // backgroundColor: "#0553"
  }
});
