import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useActivityDetail } from '../hooks/useActivityDetail';
import { ErrorView } from '../components/ErrorView';
import { colors } from '../theme/colors';

export const ActivityDetailScreen = () => {
  const { activity, formattedDate, goBack } = useActivityDetail();

  if (!activity) {
    return (
      <ErrorView
        testID="activity-detail-error"
        title="No Activity Selected"
        message="Please go back to the list and select an activity."
        onRetry={goBack}
        buttonText="Back to List"
      />
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      testID="activity-detail-screen"
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.type}>{activity.type}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>

        <Text style={styles.title}>{activity.title || activity.type}</Text>

        {activity.description && (
          <Text style={styles.description}>{activity.description}</Text>
        )}

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statValue}>{activity.duration} min</Text>
          </View>
          {activity.distance !== undefined && activity.distance !== null && (
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Distance</Text>
              <Text style={styles.statValue}>{activity.distance} km</Text>
            </View>
          )}
          {activity.calories !== undefined && activity.calories !== null && (
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Calories</Text>
              <Text style={styles.statValue}>{activity.calories} kcal</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  header: {
    marginBottom: 16,
  },
  type: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  date: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 24,
    gap: 24,
  },
  statItem: {
    minWidth: '30%',
  },
  statLabel: {
    fontSize: 13,
    color: colors.text.light,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },
});
