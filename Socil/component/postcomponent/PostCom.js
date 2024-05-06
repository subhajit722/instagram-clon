import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Alert,Text } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { firestore } from '../../firebase';
import * as FileSystem from 'expo-file-system';

const PostCom = ({ userId, user }) => {
    const [postDesc, setPostDesc] = useState('');
    const [media, setMedia] = useState(null);
    const [mediaBase64, setMediaBase64] = useState(null);
    const [isVideo, setIsVideo] = useState(false);

    const handlePickMedia = async (mediaType) => {
        let result;
        if (mediaType === 'photo') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
        } else if (mediaType === 'video') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        }
    
        console.log('ImagePicker result:', result); 
    
        if (!result.cancelled) {
            setMedia(result);
    
       
            if (result.assets && result.assets.length > 0) {
                if (result.assets[0].type === 'image') {
                    const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: FileSystem.EncodingType.Base64 });
                    setMediaBase64(`data:image/jpeg;base64,${base64}`);
                } else if (result.assets[0].type === 'video') {
                    const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: FileSystem.EncodingType.Base64 });
                    setMediaBase64(`data:video/mp4;base64,${base64}`);
                }
            }
        }
    };
    
    const addPost = async () => {
        try {
         
            const mediaUrl = mediaBase64 || (media && media.assets && media.assets.length > 0 ? media.assets[0].uri : null);

            const docRef = await addDoc(collection(firestore, `users/${userId}/posts`), {
                mediaUrl: mediaUrl,
                postDesc: postDesc,
                like: 0,
                PostAt: new Date().toISOString(),
                username: user.username,
                profilepic: user.profileImgUrl
            });

            

            setPostDesc('');
            setMedia(null);
            setMediaBase64(null);
            setIsVideo(false);
            Alert.alert('Success', 'Post created successfully!');
        } catch (error) {
            console.error('Error creating post:', error.message);
            Alert.alert('Error', 'Failed to create post. Please try again later.');
        }
    };

    return (
        <View style={styles.container}>
        <Text style={{ fontStyle: 'italic' }}>Make a New Post</Text>
        <View style={styles.mediacon}>
            {media && (
                <View style={styles.mediaPreview}>
                    {media.assets[0].type === 'video' ? (
                        <Video
                            source={{ uri: mediaBase64 }}
                            style={styles.media}
                            useNativeControls
                            resizeMode="cover"
                        />
                    ) : (
                        <Image source={{ uri: mediaBase64 }} style={styles.media} />
                    )}
                </View>
            )}
        </View>
        <TextInput
            style={styles.input}
            placeholder="Write a caption..."
            onChangeText={setPostDesc}
            value={postDesc}
            multiline
        />
        <View style={styles.mediaContainer}>
            <Button title="Select Photo" onPress={() => handlePickMedia('photo')} />
            <Button title="Select Video" onPress={() => handlePickMedia('video')} />
        </View>
        <Button title="Share" onPress={addPost} />
    </View>
    
    );
};

const styles = StyleSheet.create({
    mediacon: {
        flex: 2,
        backgroundColor: '#f0f8ff',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        width: '100%'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f0f8ff'
    },
    mediaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    mediaPreview: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    media: {
        width: 300,
        height: 300,
        borderRadius: 8,
        marginBottom: 10,
    },
});

export default PostCom;
