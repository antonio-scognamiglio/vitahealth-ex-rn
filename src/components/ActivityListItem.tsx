import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { formatActivityDate } from "../utils/dateUtils";
import { Activity } from "../types/activity";
import { colors } from "../theme/colors";

interface ActivityListItemProps {
  activity: Activity;
  onPress: () => void;
}

export const ActivityListItem: React.FC<ActivityListItemProps> = ({
  activity,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.rowWrapper}>
        <View style={styles.leftColumn}>
          <Text style={styles.title} numberOfLines={2}>
            {activity.title || activity.type}
          </Text>
          <Text style={styles.date}>{formatActivityDate(activity.date)}</Text>
        </View>

        <View style={styles.rightColumn}>
          <Text style={styles.duration}>{activity.duration} min</Text>
          {activity.distance !== undefined && activity.distance !== null && (
            <Text style={styles.distance}>{activity.distance} km</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "transparent",
    overflow: "hidden",
  },
  rowWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  pressed: {
    backgroundColor: "#E0E7FF",
    opacity: 0.75,
  },
  leftColumn: {
    flex: 1,
    marginRight: 16,
    justifyContent: "center",
  },
  rightColumn: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: "500",
  },
  duration: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 4,
  },
  distance: {
    fontSize: 13,
    color: colors.text.secondary,
    fontWeight: "500",
  },
});
