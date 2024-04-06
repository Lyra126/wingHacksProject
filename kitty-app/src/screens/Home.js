import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from "react-native";
import {
  TapGestureHandler,
  State,
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import profileImage from "../../assets/profile.png";
import declineCallImage from '../../assets/declinecall.png';
import receiveCallImage from '../../assets/receivecall.png';
import catImage from '../../assets/kitty_resting.png';
import { useNavigation } from '@react-navigation/native';
import imageBG from '../../assets/kitty_background.png';


const handleDoubleTap = (setBannerVisible) => {
  console.log("Double tap detected!");
  setBannerVisible((current) => !current); // Toggle the visibility of the banner
};

const handleSwipe = () => {
  console.log("Swiped!");
};

const Home = () => {
  const navigation = useNavigation();
  const [isBannerVisible, setBannerVisible] = useState(false); // State to manage the visibility of the banner

  const handleDeclineCall = () => {
    setBannerVisible(false);
  };

  const handleReceiveCall = () => {
    navigation.navigate("FakePhoneCall");
  };

  // Gestures
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      handleDoubleTap(setBannerVisible);
    });

  const swipe = Gesture.Pan().onStart(handleSwipe);

  return (
    <ImageBackground source={imageBG} style={styles.imagebgStyle}>
      <Modal transparent={true} visible={isBannerVisible}>
        <View style={styles.banner}>
          <View style={styles.horizontalContainer}>
            <Image source={profileImage} style={styles.bannerImage} />
            <View style={styles.verticalTextContainer}>
              <Text style={styles.text}>Bob</Text>
              <Text style={styles.text}>(Boyfriend)</Text>
            </View>
            <TouchableOpacity onPress={handleDeclineCall}>
              <Image source={declineCallImage} style={styles.bannerImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleReceiveCall}>
              <Image source={receiveCallImage} style={styles.bannerImage} />
              <Image source={receiveCallImage} style={styles.bannerImage} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <GestureHandlerRootView style={styles.container}>
        <GestureDetector gesture={doubleTap}>
          <GestureDetector gesture={swipe}>
            <Image
              style={styles.catImage}
              source={catImage} // Path to your local image file
            />
          </GestureDetector>
        </GestureDetector>
      </GestureHandlerRootView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    backgroundColor: "#1b1b2e",
    padding: 20,
    borderRadius: 10, // Rounded corners
    marginTop: 35,
    marginTop: 35,
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  verticalTextContainer: {
    flex: 1,
    justifyContent: "center",
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  bannerImage: {
    width: 50,
    height: 50,
    margin: 5
  },
  imagebgStyle:{
    width: 415,
    height: 900,
    zIndex: -1
  },
  catImage:{
    position: 'absolute',
    bottom: 400,
    left: 65,
    width: 300,
    height: 300,
    resizeMode: 'contain'
  }
});

export default Home;
