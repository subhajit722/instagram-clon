import React from 'react';
import { TouchableOpacity, Text, View, Button, StyleSheet } from 'react-native';

const Gangamattibtn = ({title,onclick}) => {
  return (
    <TouchableOpacity  onPress={() => {
      onclick()
      }} style={styles.button}>

     <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    elevation : 8,
    padding: 10,
    marginVertical: 10, 
    marginHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#841584', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  appButtonText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default Gangamattibtn;
