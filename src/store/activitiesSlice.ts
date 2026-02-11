import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { activityService } from "../services/activityService";
import { Activity, ActivityState } from "../types/activity";
import { isWithinInterval, startOfWeek, endOfWeek, parseISO } from "date-fns";

export const initialState: ActivityState = {
  activities: [],
  loading: false,
  error: null,
  currentActivity: null,
};

export const fetchActivities = createAsyncThunk(
  "activities/fetchActivities",
  async () => {
    const response: Activity[] = await activityService.fetchActivities();
    return response;
  },
);

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    setSelectedActivity: (state, action: PayloadAction<Activity>) => {
      state.currentActivity = action.payload;
    },
    clearSelectedActivity: (state) => {
      state.currentActivity = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const { setSelectedActivity, clearSelectedActivity } =
  activitiesSlice.actions;

export default activitiesSlice.reducer;

export const selectAllActivities = (state: { activities: ActivityState }) =>
  state.activities.activities;
export const selectActivityLoading = (state: { activities: ActivityState }) =>
  state.activities.loading;
export const selectActivityError = (state: { activities: ActivityState }) =>
  state.activities.error;

export const selectCurrentWeekActivities = createSelector(
  [selectAllActivities],
  (allActivities: Activity[]) => {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 }); // Monday
    const end = endOfWeek(now, { weekStartsOn: 1 }); // Sunday

    return allActivities
      .filter((activity) => {
        const activityDate = parseISO(activity.date);
        return (
          isWithinInterval(activityDate, { start, end }) &&
          activityDate <= new Date()
        );
      })
      .sort((a, b) => {
        // Ordino dalla più recente alla meno recente
        return parseISO(b.date).getTime() - parseISO(a.date).getTime();
      });
  },
);

export const selectCurrentActivity = (state: { activities: ActivityState }) =>
  state.activities.currentActivity;
