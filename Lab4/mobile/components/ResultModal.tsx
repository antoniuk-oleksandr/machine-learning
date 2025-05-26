import { findMaxEntry } from "@/utils/utils";
import type React from "react";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import { ModalElement } from "./ModalElement";
import { ResultList } from "./ResultList";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type ResultModalProps = {
  isVisible: boolean,
  onClose: () => void,
  result: Record<string, number>,
}

export const ResultModal = (props: ResultModalProps) => {
  const { onClose, isVisible, result } = props;
  const { height } = Dimensions.get('window');
  const screenHeightInVH = height * 0.01;

  const maxEntry = findMaxEntry(result);

  const styles = StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 20,
      color: '#000000'
    },
    resultContainer: {
      backgroundColor: '#FFF',
      height: screenHeightInVH * 60,
      width: '100%',
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

  return (
    <ModalElement isVisible={isVisible}>
      <ThemedView style={styles.resultContainer}>
        <ThemedText type="title" style={styles.title}>Result: {maxEntry[0]} : {maxEntry[1]}</ThemedText>

        <ResultList resultData={result} />
        <Pressable onPress={onClose} style={styles.closeButton}>
          <ThemedText style={styles.closeText}>Close</ThemedText>
        </Pressable>
      </ThemedView>
    </ModalElement>
  )

}

