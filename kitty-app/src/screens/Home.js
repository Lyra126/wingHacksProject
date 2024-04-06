import React, { useRef, useEffect, useState } from "react";
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
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import profileImage from "../../assets/profile.png";
import declineCallImage from "../../assets/declinecall.png";
import receiveCallImage from "../../assets/receivecall.png";
import catImage from "../../assets/kitty_resting.png";
import settingGear from "../../assets/setting-gear.png";
import catImageAngry from '../../assets/kitty_angry.png';
import { useNavigation } from "@react-navigation/native";
import imageBG from "../../assets/kitty_background.png";
import axios from "axios";


// Gesture Handler
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
  const [catImageState, setCatImage] = useState(catImage); 

  const [tips, setTips] = useState([]);
  const [randomTip, setRandomTip] = useState(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axios.get('http://localhost:8080/tips/getAll');
        if (response.status !== 200) {
          throw new Error('Failed to fetch tips');
        }
        const data = response.data;
        const tipsArray = data.map(tip => tip.tip);
        setTips(tipsArray);
        const randomIndex = Math.floor(Math.random() * tipsArray.length);
        setRandomTip(tipsArray[randomIndex]);
      } catch (error) {
        console.error('Error fetching tips:', error);
      }
    };

    fetchTips();
  }, []);

  // Handling Button Press
  const handleDeclineCall = () => {
    setCatImage(catImage);
    setBannerVisible(false);
  };

  const handleReceiveCall = () => {
    setBannerVisible(false);
    navigation.navigate("FakePhoneCall");
  };

  const handleSettingPress = () => {
    navigation.navigate("Setting");
  };

  // Gestures
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      handleDoubleTap(setBannerVisible);
      setCatImage(catImageAngry);
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
            </View>
            <TouchableOpacity onPress={handleDeclineCall}>
              <Image source={declineCallImage} style={styles.bannerImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleReceiveCall}>
              <Image source={receiveCallImage} style={styles.bannerImage} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.container} onPress={handleSettingPress}>
        <Image style={styles.settingImage} source={settingGear} />
      </TouchableOpacity>
      <GestureHandlerRootView style={styles.container}>
        <GestureDetector gesture={doubleTap}>
          <GestureDetector gesture={swipe}>
            <Image
              style={styles.catImage}
              source={catImageState} // Path to your local image file
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
    fontSize: 22,
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
    margin: 5,
  },
  imagebgStyle: {
    width: 415,
    height: 900,
    zIndex: -1,
  },
  catImage: {
    position: "absolute",
    bottom: 0,
    left: -368,
    width: 1150,
    height: 1150,
    resizeMode: "contain",
  },
  settingImage: {
    position: "absolute",
    width: 50,
    height: 50,
    top: 45,
    right: 75,
    resizeMode: "contain",
    zIndex: 20
  },
});

export default Home;
