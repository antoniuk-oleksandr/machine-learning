import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

type ModalElementProps = {
  children: React.ReactNode,
  isVisible: boolean,
}

export const ModalElement = (props: ModalElementProps) => {
  const { children, isVisible } = props;

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <ThemedView style={styles.modalContainer}>
          {children}
        </ThemedView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    maxHeight: '80%',
    minHeight: '40%',
  },
});
