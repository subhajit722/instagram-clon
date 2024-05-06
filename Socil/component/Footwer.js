import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Footwer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-outline" size={25} color="white" />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Search')}>
        <Ionicons name="search-outline" size={25} color="white" />
        <Text style={styles.iconText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Add')}>
        <Ionicons name="add-circle-outline" size={25} color="white" />
        <Text style={styles.iconText}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Activity')}>
            <Ionicons name="camera-outline" size={25} color="white" />
       
        <Text style={styles.iconText}>Rell</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person-outline" size={25} color="white" />
        <Text style={styles.iconText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    color : 'white'
  },
  iconContainer: {
    alignItems: 'center',
    color : 'white'
  },
  iconText: {
    fontSize: 12,
    marginTop: 5,
    color : 'white'
  },
});

export default Footwer;
