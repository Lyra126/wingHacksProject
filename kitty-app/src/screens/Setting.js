import {
  Button,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";
import settingImage from "../../assets/setting-header.png";
import imageBG from "../../assets/settingBG.png";
import { useState } from "react";
import Icon from "@expo/vector-icons/Entypo";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useGlobal } from "../context/global";

const Setting = () => {
  const [isContactVisible, setContactVisible] = useState(false);
  const navigation = useNavigation();
  const { globalState, setGlobalState } = useGlobal();
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
  });

  // Handle events
  const handleButtonPress = () => {
    setContactVisible((current) => !current);
  };

  const handleCrossPress = () => {
    navigation.navigate("Home");
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setGlobalState({ ...globalState, name: formData.name });
    setGlobalState({ ...globalState, relationship: formData.relationship });
    alert("Submitted!");

    setContactVisible(false);
  };

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  return (
    <ImageBackground source={imageBG} style={styles.imagebgStyle}>
      <TouchableOpacity onPress={handleCrossPress}>
        <Icon
          name="cross"
          size={60}
          color={"#5c2f28"}
          style={{ zIndex: 1, position: "absolute", top: 30 }}
        />
      </TouchableOpacity>
      <View style={styles.modalContainer}>
        <Text style={styles.text}>Enter name of contact:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={formData.name}
          onChangeText={(text) => handleInputChange("name", text)}
        />
        <Text style={styles.text}>Enter relationship of contact:</Text>
        <TextInput
          style={styles.input}
          placeholder="Relationship"
          value={formData.relationship}
          onChangeText={(text) => handleInputChange("relationship", text)}
        />
        <Button color={"#7E3A15"} title="Submit" onPress={handleSubmit} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    width: 200,
    height: 100,
    marginTop: 20,
  },
  tint: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.30)",
  },
  imagebgStyle: {
    width: 415,
    height: 900,
    left: -12,
    zIndex: -1,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    top: 325,
  },
  input: {
    borderWidth: 1,
    borderColor: "#C88A65",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  text: { color: "#7E3A15" },
});

export default Setting;
