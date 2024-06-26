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
import profileImage from "../../assets/pfp_man.png";
import declineCallImage from "../../assets/declinecall.png";
import receiveCallImage from "../../assets/receivecall.png";
import catImage from "../../assets/kitty_resting.png";
import settingGear from "../../assets/gear.png";
import catImageAngry from "../../assets/kitty_angry.png";
import { useNavigation } from "@react-navigation/native";
import imageBG from "../../assets/kitty_background.png";
import axios from "axios";
import { useGlobal } from "../context/global";

// Gesture Handler
const handleDoubleTap = (setBannerVisible, setGlobalState) => {
  console.log("Double tap detected!");
  setBannerVisible((current) => !current);
  //setGlobalState({ ...globalState });
};

const Home = () => {
  //all variables
  const navigation = useNavigation();
  const [isBannerVisible, setBannerVisible] = useState(false); // State to manage the visibility of the banner
  const [catImageState, setCatImage] = useState(catImage);
  const [tips, setTips] = useState([]);
  const [randomTip, setRandomTip] = useState(null);
  const { globalState, setGlobalState } = useGlobal();

  useEffect(() => {
    axios
      .get("http://10.136.188.251:8080/tips/getAll")
      .then((response) => {
        const tipsWithIds = response.data.map(({ id, tip }) => ({ id, tip }));
        setTips(tipsWithIds);

        // Selecting a random tip
        const randomIndex = Math.floor(Math.random() * tipsWithIds.length);
        const randomTip = tipsWithIds[randomIndex].tip;
        setRandomTip(randomTip);
      })
      .catch((error) => {
        console.error("Error fetching tips:", error);
      });
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
    setBannerVisible(false);
    navigation.navigate("Setting");
  };

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      handleDoubleTap(setBannerVisible, setGlobalState);
      setCatImage(catImageAngry);
    });

  useEffect(() => {
    console.log("Current name is: " + globalState.name);
  }, [globalState]);

  return (
    <ImageBackground source={imageBG} style={styles.imagebgStyle}>
      <Modal transparent={true} visible={isBannerVisible}>
        <View style={styles.banner}>
          <View style={styles.horizontalContainer}>
            <Image source={profileImage} style={styles.bannerImage} />
            <View style={styles.verticalTextContainer}>
              <Text style={styles.text}>{globalState.name}</Text>
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
      <TouchableOpacity style={{ zIndex: 1 }} onPress={handleSettingPress}>
        <Image style={styles.settingImage} source={settingGear} />
      </TouchableOpacity>
      <Text style={styles.randomTipText}>{randomTip}</Text>
      <GestureHandlerRootView style={styles.container}>
        <GestureDetector gesture={doubleTap}>
          <Image style={styles.catImage} source={catImageState} />
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
    borderRadius: 10,
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
    left: -12,
    zIndex: -1,
  },
  catImage: {
    position: "absolute",
    bottom: 0,
    left: -320,
    width: 1050,
    height: 1050,
    resizeMode: "contain",
  },
  settingImage: {
    position: "absolute",
    width: 500,
    height: 500,
    top: -180,
    right: 0,
    resizeMode: "contain",
  },
  randomTipText: {
    position: "absolute",
    top: 67,
    padding: 60,
    fontFamily: "comics",
  },
});

export default Home;
