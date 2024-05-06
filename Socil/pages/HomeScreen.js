import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { collectionGroup, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import Story from '../component/homecomponent/Stroy';
import Footwer from '../component/Footwer';
import GetPost from '../component/postcomponent/GetPost';
import { Audio } from 'expo-av'; // Import Audio module from Expo

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [liked, setLiked] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collectionGroup(firestore, 'posts'));
        const postData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            profile: data.profilepic,
            username: data.username,
            postDesc: data.postDesc,
            mediaUrl: data.mediaUrl,
            createdAt: data.createdAt,
            like: data.like
          };
        });
     
        setPosts(postData);
        setLiked(Object.fromEntries(postData.map((_, index) => [index, false])));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, []);

  const handleLike = async (index) => {
    setLiked((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));

    // Play sound effect when liked
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('../assets/like.mp3'));
      await soundObject.playAsync();
      // Unload the sound object after it finishes playing
      await soundObject.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          await soundObject.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Failed to play sound', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.storySection}>
        <Story />
      </View>
      <FlatList
        style={styles.postList}
        data={posts}
        renderItem={({ item, index }) => (
          <GetPost data={item} handleLike={() => handleLike(index)} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Footwer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storySection: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postList: {
    flex: 1,
  },
});
