import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useActivities } from '../hooks/useActivities';
import { ActivityListItem } from '../components/ActivityListItem';
import { EmptyState } from '../components/EmptyState';
import { LoadingView } from '../components/LoadingView';
import { ErrorView } from '../components/ErrorView';
import { colors } from '../theme/colors';
import { Activity } from '../types/activity';

export const ActivityListScreen = () => {
  const router = useRouter();
  const { activities, loading, error, selectActivity, retryFetch } =
    useActivities();

  const handlePressActivity = useCallback(
    (activity: Activity) => {
      selectActivity(activity);
      router.push(`/${activity.id}`);
    },
    [selectActivity, router],
  );

  if (loading) {
    return (
      <LoadingView
        testID="activity-loading"
        message="Loading your activities..."
      />
    );
  }

  if (error) {
    return (
      <ErrorView
        testID="activity-error"
        message={`An error occurred: ${error}`}
        onRetry={retryFetch}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActivityListItem
            activity={item}
            onPress={() => handlePressActivity(item)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            testID="activity-empty"
            message="No activities recorded for this week."
          />
        }
        contentContainerStyle={[
          styles.listContent,
          activities.length === 0 ? styles.center : undefined,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
    paddingBottom: 20,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
