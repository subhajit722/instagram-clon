import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth, firestore, storage } from '../firebase.js'; // Import Firebase modules
import { collection, getDocs,doc,updateDoc} from 'firebase/firestore';
import { updatePassword } from 'firebase/auth';

export default function SettingsScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  
 

  const handleSaveChanges = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('User not authenticated');
        return;
      }
      
   
      if (newPassword) {
        await updatePassword(user, newPassword);
        console.log('Password updated successfully');
        setNewPassword('');
      }
      
 
      if (newUsername) {
        const userId = user.uid;
        const userRef = doc(firestore, 'users', userId);
        await updateDoc(userRef, { username: newUsername });
        console.log('Username updated successfully');
        setNewUsername('');
      }

   
     
      console.log('Changes saved successfully');
    } catch (error) {
      console.error('Error saving changes:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Change Password:</Text>
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password"
        secureTextEntry
      />

      <Text style={styles.label}>Change Username:</Text>
      <TextInput
        style={styles.input}
        value={newUsername}
        onChangeText={setNewUsername}
        placeholder="New Username"
      />

 

      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
