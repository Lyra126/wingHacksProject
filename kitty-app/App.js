import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/Home";
import FakePhoneCallScreen from "./src/screens/FakePhoneCall";
import Setting from "./src/screens/Setting";
import * as Font from "expo-font";
import { GlobalProvider } from "./src/context/global";

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    Font.loadAsync({
      comics: require("./assets/comicsans.ttf"),
    });
  }, []);

  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="FakePhoneCall" component={FakePhoneCallScreen} />
          <Stack.Screen name="Setting" component={Setting} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
};

export default App;
