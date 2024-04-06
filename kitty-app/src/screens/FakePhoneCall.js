import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import fakecall from "../../assets/fakecall.png";

const FakeHomeCall = () => {
  return (
    <View style={styles.container}>
      <Image source={fakecall} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 390,
    height: 760,
  },
});

export default FakeHomeCall;
