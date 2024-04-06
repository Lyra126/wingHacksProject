import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FakeHomeCall = () => {
  return (
    <View style={styles.container}>
      <Text>hi</Text>
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
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default FakeHomeCall;
