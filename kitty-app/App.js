import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/Home";
import FakePhoneCallScreen from "./src/screens/FakePhoneCall";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FakePhoneCall" component={FakePhoneCallScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
