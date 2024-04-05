// PhotoViewer.js

import React, { useRef } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const images = [
  require('.assets/cat.png'),
  // Add more image paths as needed
];

const Home = () => {
  const swiperRef = useRef(null);

  const handleDoubleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // Perform action on double tap, such as zooming in
      console.log('Double tap detected!');
    }
  };

  return (
    <View style={styles.container}>
      <TapGestureHandler
        numberOfTaps={2}
        onHandlerStateChange={handleDoubleTap}>
        <View style={styles.container}>
          <Swiper
            ref={swiperRef}
            loop={false}
            showsButtons={true}
            index={0}
            onIndexChanged={index => console.log('Swiped to slide:', index)}>
            {images.map((image, index) => (
              <View key={index} style={styles.slide}>
                <Image source={image} style={styles.image} />
              </View>
            ))}
          </Swiper>
        </View>
      </TapGestureHandler>
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

export default Home;
