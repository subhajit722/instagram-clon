import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Logo from '../assets/GANGAMATTI LOGO.png';
import Gangamattibtn from '../component/btn/Gangamattibtn';
import * as FileSystem from 'expo-file-system';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjNTQihFnGefsa1uVqxBV3jB3Zx8gouN0",
  authDomain: "bytewave-1e68a.firebaseapp.com",
  projectId: "bytewave-1e68a",
  storageBucket: "bytewave-1e68a.appspot.com",
  messagingSenderId: "362705383181",
  appId: "1:362705383181:web:fd03c0ef50849bdbbe0a44"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(app);

export default function AuthScreen() {
  const nav = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [profileImg, setProfileImg] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Permission to access camera roll and camera required!');
      }
    })();
  }, []);

  const handlePickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled && result.assets[0].uri) {
        const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: FileSystem.EncodingType.Base64 });
        setProfileImg(`data:image/jpeg;base64,${base64}`);
      } else {
        console.log('Image selection cancelled or URI is null');
        console.log('Result:', result);
      }
    } catch (error) {
      console.error('Error converting image to base64:', error);
    }
  };

  const handleToggleMode = () => {
    setIsSignUp(prevMode => !prevMode);
  };

  const handleAuthAction = async () => {
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;

        // Save user data to Firestore
        await setDoc(doc(firestore, 'users', userId), {
          email: email,
          username: username,
          profileImgUrl: profileImg,
        });

        // Show signup confirmation message
        Alert.alert('Signup Successful', 'Signup is complete. Please proceed to login.');
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await AsyncStorage.setItem('authStatus', userCredential.user.uid);
        nav.navigate('Home');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* {profileImg && isSignUp ? (
        <View style={styles.imagePickerContainer}>
          <Image source={{ uri: profileImg }} style={styles.profileImg} />
        </View>
      ) : (
        <Image style={styles.profileImg} source={Logo} />
      )} */}
       <Image style={styles.profileImg} source={Logo} />
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      {isSignUp && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
        />
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginTop: 2 }}>
        {/* {isSignUp ? <Button title="Upload Profile Image" onPress={handlePickImage} /> : null} */}
        <Button title={isSignUp ? 'Sign Up' : 'Login'} onPress={handleAuthAction} />
      </View>
      <View style={{ marginTop: 20 }} >
       <Text onPress={handleToggleMode}>{isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}</Text>
       
        {/* <Gangamattibtn title={isSignUp ? 'Switch to Login' : 'Switch to Sign Up'} onclick={handleToggleMode} /> */}
      </View>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  imagePickerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImg: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});
