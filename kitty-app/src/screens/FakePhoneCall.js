import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import fakecall from '../../assets/fakecall.png';
import declineCallImage from '../../assets/declinecall.png';
import receiveCallImage from '../../assets/receivecall.png';
import { useNavigation } from '@react-navigation/native';



const FakeHomeCall = () => {
    const navigation = useNavigation();
    const handleDeclineCallFake = () => {
        navigation.navigate('Home');
      };

      const playAudio = () => {
        //audio is playing, retrieve file from database
      };

      const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(prevTime => prevTime + 1); // Increase the current time by 1 second
        }, 1000);

        // Cleanup function to clear the interval when component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to run the effect only once when component mounts

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
      <TouchableOpacity onPress={playAudio}>
        <Image source={receiveCallImage} style={styles.receiveCall} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
