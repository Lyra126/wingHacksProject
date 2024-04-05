import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TapGestureHandler, State , GestureHandlerRootView} from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';

  const handleDoubleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // Perform action on double tap, such as zooming in
      console.log('Double tap detected!');
    }
  };


const App = () => {
  const swiperRef = useRef(null);
  return(
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
      <TapGestureHandler
        numberOfTaps={2}
        onHandlerStateChange={handleDoubleTap}>
      <Image
        style={styles.image}
        source={require('./assets/cat.png')} // Path to your local image file
      />
      </TapGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default App;
