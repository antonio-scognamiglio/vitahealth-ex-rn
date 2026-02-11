import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No activities found.",
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  text: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
  },
});
