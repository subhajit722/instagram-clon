import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleCommentSubmit = () => {
   
    console.log('Comment submitted:', commentText);
    setCommentText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      
        <Text style={styles.username}>{post.username}</Text>
      </View>

     

      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLike}>
          <Ionicons name="heart-outline" size={24} color={liked ? 'red' : '#333'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleComment}>
          <Ionicons name="chatbubble-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('View user profile')}>
          <Text style={styles.action}>View Profile</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.likes}>{post.likes} likes</Text>

      {showCommentBox && (
        <View style={styles.commentBox}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={commentText}
            onChangeText={text => setCommentText(text)}
            onSubmitEditing={handleCommentSubmit}
          />
        </View>
      )}

      {post.comments.map(comment => (
        <View key={comment.id} style={styles.commentContainer}>
          <Text style={styles.commentUsername}>{comment.username}</Text>
          <Text style={styles.commentText}>{comment.text}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  action: {
    fontWeight: 'bold',
    color: '#333',
  },
  likes: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  commentUsername: {
    fontWeight: 'bold',
    paddingRight: 5,
  },
  commentText: {
    flex: 1,
  },
  commentBox: {
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  commentInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
  },
});

export default Post;
