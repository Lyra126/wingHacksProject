import { Image, StyleSheet, View } from "react-native";
import settingImage from "../../assets/setting-header.png";

const Setting = () => {
  return (
    <>
      <View style={styles.container}>
        <Image style={styles.title} source={settingImage} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
  title: {
    width: 200,
    height: 100,
    marginTop: 20,
  },
});

export default Setting;
