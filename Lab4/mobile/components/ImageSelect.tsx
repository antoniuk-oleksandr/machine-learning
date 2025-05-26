import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ModalElement } from './ModalElement';

type ImageSelectProps = {
  isVisible: boolean;
  onClose: () => void;
  onSelectImage: (uri:  ImagePicker.ImagePickerResult) => void;
};

const ImageSelect: React.FC<ImageSelectProps> = ({ isVisible, onClose, onSelectImage }) => {
  const pickImageFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Gallery permission is required');
      return;
    }

    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!image.canceled && image.assets.length > 0) {
      onSelectImage(image);
      onClose();
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert('Camera permission is required');
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

   if (!image.canceled && image.assets.length > 0) {
      onSelectImage(image);
      onClose();
    }
  };

  return (
    <ModalElement isVisible={isVisible}>
      <ThemedText type="title" style={styles.title}>Select or Take a Photo</ThemedText>

      <Pressable onPress={pickImageFromGallery} style={styles.optionButton}>
        <Ionicons name="images" size={24} color="#6B9080" />
        <ThemedText style={styles.optionText}>Select from Gallery</ThemedText>
      </Pressable>

      <Pressable onPress={takePhoto} style={styles.optionButton}>
        <Ionicons name="camera" size={24} color="#6B9080" />
        <ThemedText style={styles.optionText}>Take a New Photo</ThemedText>
      </Pressable>

      <Pressable onPress={onClose} style={styles.closeButton}>
        <ThemedText style={styles.closeText}>Close</ThemedText>
      </Pressable>
    </ModalElement>
  );
};

export const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#000000'
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#6B9080',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6B9080',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  closeText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ImageSelect;
