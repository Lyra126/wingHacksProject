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
import imageBG from "../../assets/kitty_background.png";
import { useState } from "react";

const Setting = () => {
  const [isContactVisible, setContactVisible] = useState(false);

  // Handle events
  const handleButtonPress = () => {
    setContactVisible((current) => !current);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // Add more form fields as needed
  });

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Optionally, you can reset the form fields and close the modal after submission
    setFormData({
      name: "",
      email: "",
      // Reset other form fields as needed
    });
    setContactVisible(false);
  };

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  return (
    <ImageBackground source={imageBG} style={styles.imagebgStyle}>
      <View style={styles.tint}>
        <View style={styles.container}>
          <Image style={styles.title} source={settingImage} />
          <Button
            title="Add Emergency Contact"
            onPress={handleButtonPress}
          ></Button>
        </View>
        <Modal
          visible={isContactVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setContactVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Popup Form</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={formData.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => handleInputChange("email", text)}
              />
              {/* Add more TextInput components for additional form fields */}
              <Button title="Submit" onPress={handleSubmit} />
              <Button title="Close" onPress={() => setContactVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
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
    zIndex: -1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default Setting;
