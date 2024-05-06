import React, { useState, useEffect } from 'react';
import { View,  StyleSheet } from 'react-native';
import PostCom from '../component/postcomponent/PostCom';
import {   doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footwer from '../component/Footwer';

export default function AddScreen() {
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const logAuthStatus = async () => {
      try {
      
        const authStatus = await AsyncStorage.getItem('authStatus');
        
        setUserId(authStatus);
      } catch (error) {
       
      }
    };

    logAuthStatus();
  }, []); // Run only on component mount

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!userId) return; // Wait until userId is set
        const userDoc = doc(firestore, 'users', userId);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserProfile(userData);
        
        } 
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    fetchUserProfile();
  }, [userId]); // Fetch user profile when userId changes

  return (
    <>
    <View style={styles.container}>
      <PostCom userId={userId} user={userProfile} />
     
    </View>
    <Footwer/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   width : '100%',
    backgroundColor: '#fff',
  },
});
