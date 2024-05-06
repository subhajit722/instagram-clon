import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Logo from '../assets/GANGAMATTI LOGO.png'

import { Ionicons } from '@expo/vector-icons';
const Header = () => {
  return (
    <View style={styles.header}>

<Image style={styles.logo} source={Logo}></Image>
<View style={styles.set}>
<Ionicons name="heart-outline" size={25} color="white" />

<View style={styles.messageIcon}>
          {/* <Ionicons name="paper-plane-outline" size={25} color="white" />
          <View style={styles.messageBadge}>
            <Text style={styles.badgeText}>5</Text>
          </View> */}
        </View>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {

    height: 80,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
    alignItems: 'center', 
    paddingHorizontal: 0,
    flexDirection: 'row', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 'auto', 
    marginRight: 'auto',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    
  },
  messageIcon: {
    alignItems: 'center',
  },
  messageBadge: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  set:{
    width :100,
    flexDirection : "row",
    justifyContent : 'space-around'
  },
  logo: {
   
    right: 10,
    width: 120, 
    height: 60, 
    resizeMode: 'contain', 
  },
});

export default Header;
