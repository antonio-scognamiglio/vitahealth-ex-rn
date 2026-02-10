import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActivities,
  selectAllActivities,
  selectActivityLoading,
  selectActivityError,
} from "../store/activitiesSlice";
import { AppDispatch } from "../store";
import { ActivityListItem } from "../components/ActivityListItem";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { colors } from "../theme/colors";

export const ActivityListScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Leggiamo lo stato da Redux
  const activities = useSelector(selectAllActivities);
  const loading = useSelector(selectActivityLoading);
  const error = useSelector(selectActivityError);

  // Appena il componente viene montato, chiediamo i dati
  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  // Gestione Loading
  if (loading) {
    return <LoadingView message="Stiamo recuperando le tue attività..." />;
  }

  // Gestione Errore
  if (error) {
    return (
      <ErrorView
        message={`Si è verificato un errore: ${error}`}
        onRetry={() => dispatch(fetchActivities())}
      />
    );
  }

  // Gestione Lista
  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ActivityListItem activity={item} />}
        ListEmptyComponent={
          <EmptyState message="Non hai ancora registrato nessuna attività questa settimana." />
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
    backgroundColor: colors.background, // Padding rimosso da qui
  },
  listContent: {
    padding: 16, // Padding aggiunto qui per fix scrollbar
    paddingBottom: 20,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
