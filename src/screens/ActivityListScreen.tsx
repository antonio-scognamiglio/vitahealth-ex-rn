import React, { useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActivities,
  setSelectedActivity,
  selectCurrentWeekActivities,
  selectActivityLoading,
  selectActivityError,
} from "../store/activitiesSlice";
import { AppDispatch } from "../store";
import { ActivityListItem } from "../components/ActivityListItem";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { colors } from "../theme/colors";
import { Activity } from "../types/activity";

export const ActivityListScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Read state from Redux
  const activities = useSelector(selectCurrentWeekActivities);
  const loading = useSelector(selectActivityLoading);
  const error = useSelector(selectActivityError);

  const handlePressActivity = useCallback(
    (activity: Activity) => {
      dispatch(setSelectedActivity(activity));
      router.push(`/${activity.id}`);
    },
    [dispatch, router],
  );

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  // Handle Loading
  if (loading) {
    return <LoadingView message="Loading your activities..." />;
  }

  // Handle Error
  if (error) {
    return (
      <ErrorView
        message={`An error occurred: ${error}`}
        onRetry={() => dispatch(fetchActivities())}
      />
    );
  }

  // Handle List
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
          <EmptyState message="No activities recorded for this week." />
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
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
