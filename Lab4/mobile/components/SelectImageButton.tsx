import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { Pressable, StyleSheet } from "react-native"
import { ThemedText } from "./ThemedText"

type SelectImageButton = {
  setIsImageModalVisible: (value: boolean) => void,
}

export const SelectImageButton = (props: SelectImageButton) => {
  const { setIsImageModalVisible } = props;

  return (
    <LinearGradient
      colors={['#6B9080', '#A4C3B2']}
      style={styles.scanButton}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Pressable
        onPress={() => setIsImageModalVisible(true)}
        style={({ pressed }) => [
          styles.buttonInner,
          { opacity: pressed ? 0.8 : 1 }
        ]}
      >
        <Ionicons name="camera" size={24} color="white" />
        <ThemedText style={styles.buttonText}>Scan Mushroom</ThemedText>
      </Pressable>
    </LinearGradient>
  )
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
