import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

interface LoadingViewProps {
  message?: string;
  testID?: string;
}

export const LoadingView: React.FC<LoadingViewProps> = ({
  message = 'Loading...',
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: colors.text.secondary,
  },
});
