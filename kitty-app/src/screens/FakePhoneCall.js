import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity,  Linking, Platform, Geolocation  } from 'react-native';
import fakecall from '../../assets/fakecall.png';
import declineCallImage from '../../assets/declinecall.png';
import receiveCallImage from '../../assets/receivecall.png';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';


const FakeHomeCall = () => {
  //location attributes
  const [altitude, setAltitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  
  const navigation = useNavigation();

  useEffect(() => {
    //have timer to imitate calls and make it look more dynamic
    const intervalId = setInterval(() => {
        setCurrentTime(prevTime => prevTime + 1);
    }, 1000);

    //fetch user location when component mounts
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
        setTimestamp(userLocation.timestamp);

        console.log(userLocation.coords.altitude);
        console.log(userLocation.coords.latitude);
        console.log(userLocation.coords.longitude);
        console.log(userLocation.coords.speed);
        console.log(userLocation.timestamp);
    })();
      return () => clearInterval(intervalId); //cleanup
  }, []); //runs effect only once
      
  const handleDeclineCallFake = () => {
      navigation.navigate('Home');
  };
    
  const handleReceiveCall = async () => {
    //so to not send msg with null attributes
    if (altitude !== null && latitude !== null && longitude !== null && speed !== null && timestamp !== null) {
      //put emergency contact numbers here
      const recipients = ['9252237924'];
      //formatting help message
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

  // format the current time into minutes and seconds
  const minutes = Math.floor(currentTime / 60).toString().padStart(2, '0');
  const seconds = (currentTime % 60).toString().padStart(2, '0');
  
  return (
    <View style={styles.container}>
      <Image source={fakecall} style={styles.image} />
      <Text style = {styles.profile}>Dad</Text>
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
    alignItems: "center"
  },
  image: {
    width: 450,
    height: 1300,
    top: 80
  },
  declineCall: {
    position: 'absolute',
    bottom: 358,
    right: 67,
    width: 92,
    height: 92
  },
  receiveCall: {
    position: 'absolute',
    bottom: 358,
    left: 67,
    width: 92,
    height: 92
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