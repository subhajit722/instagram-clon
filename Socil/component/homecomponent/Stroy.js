import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Story = () => {
  
  const stories = [
    { id: 1, username: 'user1', img : 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, username: 'user2', img : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, username: 'user3' , img : 'https://plus.unsplash.com/premium_photo-1667239129251-ebcdf421eb3c?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    { id: 4, username: 'user4',img : 'https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 5, username: 'user5' ,img :"https://images.unsplash.com/photo-1600209142000-aa256622e64a?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    { id: 6, username: 'user6',img : 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 7, username: 'user7', img : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 8, username: 'user8' , img : 'https://plus.unsplash.com/premium_photo-1667239129251-ebcdf421eb3c?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    { id: 9, username: 'user9',img : 'https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 10, username: 'user10' ,img :"https://images.unsplash.com/photo-1600209142000-aa256622e64a?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  ];

  return (
    <ScrollView horizontal  contentContainerStyle={styles.container}>
          <TouchableOpacity  style={styles.storyItem}>
          <Image source={{ uri : stories[4].img }} style={styles.storyImage} />
          <Text style={styles.username}>YOur profile</Text>
        </TouchableOpacity>
      {stories.map(story => (
        <TouchableOpacity key={story.id} style={styles.storyItem}>
          <Image source={{ uri: story.img }} style={styles.storyImage} />
          <Text style={styles.username}>{story.username.length > 4 ? story.username.slice(0,4)+'...' :story.username }</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      left: 0,
      flexDirection: 'row',
      alignItems: 'center',
     height : 100,
     
    },
    storyItem: {
      marginRight: 15,
      alignItems: 'center',
    },
    storyImage: {
      width: 70,
      height: 70,
      borderRadius: 35,
      marginBottom: 5,
    },
    username: {
      color: '#fff',
      fontSize: 12,
    },
  });
  
export default Story;
