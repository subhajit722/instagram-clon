import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

const PostDetailScreen = ({ route }) => {
  const { postId, img } = route.params;

  return (
    <View style={styles.container}>
      {/* Fullscreen Image */}
      {img && img.startsWith('data:video') ? (
          <Video
            source={{ uri: img }}
            style={styles.image}
            useNativeControls={false}
                resizeMode="contain"
                shouldPlay={true}
                isLooping={true}
          />
        ) : (
          img && <Image source={{ uri: img }} style={styles.image} />
        )}

      {/* Like and Comment Icons */}
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="chatbubble-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* <Text style={styles.postIdText}>Post ID: {postId}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    width : 200,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 40,
    zIndex: 1, // Ensure icons are above the image
  },
  iconContainer: {
 
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 20,
  },
  postIdText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: 'white',
    fontSize: 18,
    zIndex: 1, // Ensure text is above the image
  },
});

export default PostDetailScreen;
