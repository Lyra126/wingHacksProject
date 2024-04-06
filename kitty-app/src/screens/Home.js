import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TapGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';


const handleDoubleTap = (event, setBannerVisible) => {
  if (event.nativeEvent.state === State.ACTIVE) {
    console.log('Double tap detected!');
    setBannerVisible(current => !current); // Toggle the visibility of the banner
  }
};

const Home = () => {
  const swiperRef = useRef(null);
  const [isBannerVisible, setBannerVisible] = useState(false); // State to manage the visibility of the banner

  const handleDeclineCall = () => {
    setBannerVisible(false);
  };

  const handleReceiveCall = () => {
    navigation.navigate('FakePhoneCall');
  };
  return (
    <View style={styles.container}>
      {isBannerVisible && ( // Conditional rendering based on the visibility state
        <View style={styles.banner}>
          <View style={styles.horizontalContainer}>
            <Image source={'../../assets/profile.png'} style={styles.bannerImage} />
            <View style={styles.verticalTextContainer}>
              <Text style={styles.text}>Bob</Text>
              <Text style={styles.text}>(Honey)</Text>
            </View>
            <Image source={'../../assets/declinecall.png'} style={styles.bannerImage} />
            <Image source={'../../assets/takecall.png'} style={styles.bannerImage} />
          </View>
        </View>
      )}
      <GestureHandlerRootView style={styles.container}>
        <TapGestureHandler
          numberOfTaps={2}
          onHandlerStateChange={(event) => handleDoubleTap(event, setBannerVisible)}>
          <Image
            style={styles.image}
            source={require('../../assets/cat.png')} // Path to your local image file
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
  banner: {
    backgroundColor: '#1b1b2e',
    padding: 20,
    borderRadius: 10, // Rounded corners
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  smallImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  verticalTextContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  largeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10, // Rounded corners
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  bannerImage:{
    width: 50,
    height: 50,
  }
});

export default Home;
