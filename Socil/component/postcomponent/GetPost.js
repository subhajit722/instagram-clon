import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const GetPosts = ({ data, handleLike, handleComment , navigation }) => {
  const [isLiked, setIsLiked] = useState(data.liked); // State to track like status
  const [isCommentVisible, setIsCommentVisible] = useState(false); // State to track comment visibility

  const handleLikePress = () => {
    handleLike(data.id); // Call the handleLike function from props
    setIsLiked(!isLiked); // Toggle the like status
  };
  
  const handlePostPress = (postId,img) => {
  
    navigation.navigate('PostDetailScreen', { postId,img });
  };

  const handleCommentPress = () => {
    // Toggle comment visibility
    setIsCommentVisible(!isCommentVisible);
    // Additional logic for opening comment box if needed
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.header}>
          <Image source={{ uri: data.profile }} style={styles.profileImage} />
          <View>
            <Text style={styles.username}>{data.username}</Text>
            <Text style={{ color: 'white' }}>{data.postDesc}</Text>
          </View>
        </TouchableOpacity>
<TouchableOpacity onPress={()=>{
  handlePostPress(data.postId, data.mediaUrl)
}}>
        {data.mediaUrl && data.mediaUrl.startsWith('data:video') ? (
          <Video
            source={{ uri: data.mediaUrl }}
            style={styles.postImage}
            useNativeControls={true}
            resizeMode="contain"
          />
        ) : (
          data.mediaUrl && <Image source={{ uri: data.mediaUrl }} style={styles.postImage} />
        )}
</TouchableOpacity>
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleLikePress}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={24}
              color={isLiked ? 'red' : 'white'}
            />
          </TouchableOpacity>
          <Text style={{ color: 'white' }}>{data.like}</Text>
          <TouchableOpacity onPress={handleCommentPress}>
            <Ionicons name="chatbubble-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Render comment box if comment is visible */}
      {isCommentVisible && (
        <View style={styles.commentBox}>
          {/* Your comment box UI */}
          <Text>Comment Box</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    margin: 10,
  },
  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginTop: 0,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    width: 100,
  },
  username: {
    color: 'white',
    fontStyle: 'italic',
  },
  commentBox: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginTop: 10,
  },
});

export default GetPosts;
