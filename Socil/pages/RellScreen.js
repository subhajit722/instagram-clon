import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { collectionGroup, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Video } from 'expo-av';
import Footwer from '../component/Footwer';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function RellScreen() {
  const [posts, setPosts] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState({});

  const videoRefs = useRef({});

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
          };
        });
        setPosts(postData);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      
      }
    };

    fetchPosts();
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentVideoIndex(index);
    }
  }).current;

  const toggleVideo = (index) => {
    setIsPlaying((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleVideoPress = (index) => {
    toggleVideo(index);
  };

  return (
    <>
      <FlatList
        data={posts}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleVideoPress(index)}>
            {item.mediaUrl && item.mediaUrl.startsWith('data:video') && (
              <Video
                ref={(ref) => (videoRefs.current[index] = ref)}
                source={{ uri: item.mediaUrl}}
                style={index === currentVideoIndex ? styles.currentVideo : styles.otherVideos}
                useNativeControls={false}
                resizeMode="contain"
                shouldPlay={index === currentVideoIndex && isPlaying[index]}
                isLooping={true}
              />
            )}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50, 
        }}
        vertical={true}
        pagingEnabled={true}
      />
      <Footwer />
    </>
  );
}

const styles = StyleSheet.create({
  currentVideo: {
    backgroundColor: 'black',
    width: screenWidth,
    height: screenHeight,
  },
  otherVideos: {
    width: screenWidth,
    height: screenHeight - 178,
    opacity: 0, // Hide other videos
  },
});
