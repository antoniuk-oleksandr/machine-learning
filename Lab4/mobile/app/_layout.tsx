import { makeFungusClassificationRequest } from '@/api/api';
import ImageSelect from '@/components/ImageSelect';
import { ResultModal } from '@/components/ResultModal';
import { SelectImageButton } from '@/components/SelectImageButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import type { MyFile } from '@/types/MyFile';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';


export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);

  const onSelectImage = async (image: ImagePicker.ImagePickerResult) => {
    if (!image.assets) return;

    const asset = image.assets[0];
    const uri = asset.uri;

    const file = {
      uri,
      name: asset.fileName ?? 'photo.jpg',
      type: 'image/jpeg',
    } as MyFile;

    setLoading(true);
    setSelectedImage(uri);
    const { status, data } = await makeFungusClassificationRequest(file);
    if (status === 200) setResult(data.result);
    else setResult(null);
    setLoading(false);
    setIsResultModalVisible(true);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>FungAI Scanner</ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Identify mushrooms instantly with AI
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <ImageSelect
          isVisible={isImageModalVisible}
          onClose={() => setIsImageModalVisible(false)}
          onSelectImage={onSelectImage}
        />

        {selectedImage && !loading && (
          <ThemedView style={styles.previewContainer}>
            <ThemedView style={styles.imageContainer}>
              <Image
                source={{ uri: selectedImage }}
                style={styles.imagePreview}
                contentFit="cover"
              />
            </ThemedView>
          </ThemedView>
        )}

        {(!selectedImage || loading) && (
          <ThemedView style={styles.placeholderContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#6B9080" />
            ) : (
              <>
                <Ionicons name="images" size={48} color="#6B9080" />
                <ThemedText style={styles.placeholderText}>
                  Take a photo to identify mushrooms
                </ThemedText>
              </>
            )}
          </ThemedView>
        )}

        <SelectImageButton setIsImageModalVisible={setIsImageModalVisible} />

        {result && (
          <ResultModal
            isVisible={isResultModalVisible}
            onClose={() => setIsResultModalVisible(false)}
            result={result}
          />
        )}
      </ThemedView>
    </ThemedView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    gap: 24,
  },
  scanButton: {
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    borderRadius: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  previewContainer: {
    gap: 24,
  },
  imageContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,

  },
  imagePreview: {
    width: '100%',
    aspectRatio: '1/1',
  },
  resultContainer: {
    backgroundColor: '#F6FFF8',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EAF4F4',
    flex: 1,
  },
  resultLabel: {
    color: '#6B9080',
    fontSize: 14,
    marginBottom: 8,
  },
  resultText: {
    color: '#2E4E48',
    fontSize: 18,
    fontWeight: '600',
  },
  placeholderContainer: {
    width: '100%',
    aspectRatio: '1/1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#F6FFF8',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#EAF4F4',
    gap: 16,
  },
  placeholderText: {
    color: '#6B9080',
    textAlign: 'center',
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
    padding: 16,
  },
  loadingText: {
    color: '#6B9080',
    fontSize: 16,
  },
  reactLogo: {
    height: 300,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
