import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { colors } from "../theme/colors";

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
  title?: string;
}

export const ErrorView: React.FC<ErrorViewProps> = ({
  message = "Si è verificato un errore.",
  title = "Ops!",
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{message}</Text>
      {onRetry && (
        <View style={styles.buttonContainer}>
          <Button title="Riprova" onPress={onRetry} color={colors.primary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: colors.error,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
