import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeApp } from 'firebase/app';
import HomeScreen from './pages/HomeScreen';
import SearchScreen from './pages/SearchScreen';
import AddScreen from './pages/AddScreen';
import RellScreen from './pages/RellScreen';
import ProfileScreen from './pages/ProfileScreen';
import PostDetailScreen from './pages/PostDetailScreen';
import SingLogin from './pages/SingLogin'; // Import the SingLogin component
import Footwer from './component/Footwer';
import Header from './component/Herder';
import SettingsScreen from './pages/SettingsScreen';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjNTQihFnGefsa1uVqxBV3jB3Zx8gouN0",
  authDomain: "bytewave-1e68a.firebaseapp.com",
  projectId: "bytewave-1e68a",
  storageBucket: "bytewave-1e68a.appspot.com",
  messagingSenderId: "362705383181",
  appId: "1:362705383181:web:fd03c0ef50849bdbbe0a44"
};




const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    console.log('Firebase app initialized');
  }, []);

  return (
    <NavigationContainer>
     
      <Stack.Navigator>
        <Stack.Screen name="SingLogin" component={SingLogin} options={{ headerShown: false }} />
        <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Add" component={AddScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Activity" component={RellScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
