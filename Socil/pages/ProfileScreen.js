import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { auth, firestore, storage } from '../firebase'; // Import Firebase modules
import { collection, getDocs,doc,updateDoc} from 'firebase/firestore';
import { Video } from 'expo-av';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icon library
import Footwer from '../component/Footwer';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [numColumns, setNumColumns] = useState(2); // Initialize with default number of columns
  const navigation = useNavigation(); // Initialize navigation
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    const logAuthStatus = async () => {
      try {
        const authStatus = await AsyncStorage.getItem('authStatus');
        setUserId(authStatus);
      } catch (error) {
        console.error('Error reading auth status:', error);
      }
    };
    getUserData()

    logAuthStatus();
  }, [profileImg]);

  const handleSaveChanges = async (profileImg) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('User not authenticated');
        return;
      }else{
        const userId = user.uid;
        const userRef = doc(firestore, 'users', userId);
        await updateDoc(userRef, { profileImgUrl: profileImg });
        console.log('Username updated successfully');
     
      }
    }
    catch (error) {
      console.error('Error saving changes:');
    }

  }
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
        
        handleSaveChanges(`data:image/jpeg;base64,${base64}`)
      } else {
        console.log('Image selection cancelled or URI is null');
        console.log('Result:', result);
      }
    } catch (error) {
      console.error('Error converting image to base64:', error);
    }
  };



  const getUserData = async () => {
    try {
      if (!userId) return;
      const userDocRef = collection(firestore, 'users');
      const querySnapshot = await getDocs(userDocRef);
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      const userData = usersData.find(user => user.id === userId);
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, [userId]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (!userId) return;
        const userPostsRef = collection(firestore, `users/${userId}/posts`);
        const querySnapshot = await getDocs(userPostsRef);
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setUserPosts(postsData);
      } catch (error) {
        console.error('Error fetching user posts:', error.message);
      }
    };

    fetchUserPosts();
  }, [userId]);

  const handlePostPress = (postId,img) => {
    navigation.navigate('PostDetailScreen', { postId,img });
  };

  const handleSettingsPress = () => {
    navigation.navigate('SettingsScreen'); 
  };

  return (
    <View style={styles.container}>
    {userData && (
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handlePickImage}>
       <Image source={{ uri: userData.profileImgUrl }} style={styles.profileImage} /></TouchableOpacity>
     
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{userData.username}</Text>
          <Text style={styles.email}>{userData.email}</Text>
         
        </View>
        <TouchableOpacity onPress={handleSettingsPress} style={styles.settingsIcon}>
          <AntDesign name="setting" size={24} color="white" />
        </TouchableOpacity>
      </View>
    )}
  
    <FlatList
      key={numColumns} // Update key when number of columns changes
      data={userPosts}
      keyExtractor={(item) => item.id}
      numColumns={numColumns} // Display posts in two columns
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.postContainer}
          onPress={() => handlePostPress(item.id ,item.mediaUrl)}
        >
         {item.mediaUrl && item.mediaUrl.startsWith('data:video') ? (
          <Video
            source={{ uri: item.mediaUrl }}
            style={styles.postImage}
            useNativeControls={true}
            resizeMode="contain"
          />
        ) : (
          item.mediaUrl && <Image source={{ uri: item.mediaUrl }} style={styles.postImage} />
        )}
        </TouchableOpacity>
      )}
    />
    <Footwer/>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop : 10,
    paddingBottom : 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    backgroundColor : 'black'
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color : 'white',
    fontStyle : 'italic'
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  postContainer: {
    flex: 1,
    borderRadius: 10,
    margin: 5,
    aspectRatio: 1, 
    padding : 2,
    borderWidth: 1,
    borderColor: 'white',// Maintain aspect ratio for each post
  },
  postImage: {
    width: '100%',
    height: '100%', // Occupy full space within the container
    resizeMode: 'cover',
    borderRadius: 10,
  },
  settingsIcon: {
   
    bottom: 0,
    left: 0,
    margin: 16,
  },
});
