import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity,  Linking, Platform, Geolocation  } from 'react-native';
import fakecall from '../../assets/fakecall.png';
import declineCallImage from '../../assets/declinecall.png';
import receiveCallImage from '../../assets/receivecall.png';
import { useNavigation } from '@react-navigation/native';
import { sendSMS } from 'react-native-sms';
import * as Location from 'expo-location';
//import * as Speech from 'expo-speech-recognition';


const FakeHomeCall = () => {

    const [altitude, setAltitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [speed, setSpeed] = useState(null);
    const [timestamp, setTimestamp] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    useEffect(() => {
        // First useEffect: setup interval to update current time
        const intervalId = setInterval(() => {
            setCurrentTime(prevTime => prevTime + 1); // Increase the current time by 1 second
        }, 1000);
    
        // Second useEffect: fetch user location when component mounts
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
    
            const userLocation = await Location.getCurrentPositionAsync();
            console.log(userLocation);
            setAltitude(userLocation.coords.altitude);
            setLatitude(userLocation.coords.latitude);
            setLongitude(userLocation.coords.longitude);
            setSpeed(userLocation.coords.speed);
            setTimestamp(userLocation.timestamp); // Use userLocation.timestamp directly, no need for userLocation.coords.timestamp
            console.log(userLocation.coords.altitude);
            console.log(userLocation.coords.latitude);
            console.log(userLocation.coords.longitude);
            console.log(userLocation.coords.speed);
            console.log(userLocation.timestamp);
        })();
    
        // Cleanup function to clear the interval when component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to run the effect only once when component mounts
      

    const navigation = useNavigation();
    const handleDeclineCallFake = () => {
        navigation.navigate('Home');
    };
    
    const handleReceiveCall = async () => {
        if (altitude !== null && latitude !== null && longitude !== null && speed !== null && timestamp !== null) {
            const recipients = ['9252237924']; // Add your desired recipient phone numbers here
            const message = `Help! Here is my location: \n
            Altitude: ${altitude}
            Latitude: ${latitude}
            Longitude: ${longitude}
            Speed: ${speed}
            Timestamp: ${timestamp}`;
          const smsUrl = Platform.select({
            ios: `sms:${recipients.join(',')}&body=${encodeURIComponent(message)}`,
            android: `sms:${recipients.join(';')}?body=${encodeURIComponent(message)}`,
          });
          try {
            await Linking.openURL(smsUrl);
            console.log('SMS app opened successfully');
          } catch (error) {
            console.log('Error opening SMS app:', error);
          }
        } else {
          console.log('Location attributes are not yet available');
        }
      };

    // Format the current time into minutes and seconds
    const minutes = Math.floor(currentTime / 60).toString().padStart(2, '0');
    const seconds = (currentTime % 60).toString().padStart(2, '0');
  return (
    <View style={styles.container}>
      <Image source={fakecall} style={styles.image} />
      <Text style = {styles.profile}>Boyfriend</Text>
      <Text style={styles.timer}>{`${minutes}:${seconds}`}</Text>
      <TouchableOpacity onPress={handleDeclineCallFake}>
        <Image source={declineCallImage} style={styles.declineCall} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReceiveCall} > 
        <Image source={receiveCallImage} style={styles.receiveCall} />
      </TouchableOpacity>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 450,
    height: 1300,
    top: 80
  },
  declineCall: {
    position: 'absolute',
    // bottom: 120, // Adjust as needed
    // right: 56, // Adjust as needed
    bottom: 363, // Adjust as needed
    right: 67, // Adjust as needed
    width: 82,
    height: 82

  },
  receiveCall: {
    position: 'absolute',
    // bottom: 120, // Adjust as needed
    // left: 56, // Adjust as needed
    bottom: 363, // Adjust as needed
    left: 70, // Adjust as needed
    width: 85,
    height: 85
  },
  timer: {
    fontSize: 24,
    bottom: 850,
    right: 0,
    color: '#ffffff'
  },
  profile: {
    fontSize: 50,
    bottom: 920,
    right: 0,
    color: '#ffffff'
  }
});

export default FakeHomeCall;
