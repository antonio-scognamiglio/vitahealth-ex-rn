import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { activityService } from "../services/activityService";
import { Activity, ActivityState } from "../types/activity";

const initialState: ActivityState = {
  activities: [],
  loading: false,
  error: null,
  selectedActivityId: null,
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
    selectActivity: (state, action: PayloadAction<string | null>) => {
      state.selectedActivityId = action.payload;
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
        state.error = action.error.message || "Errore sconosciuto";
      });
  },
});

export const { selectActivity } = activitiesSlice.actions;

export default activitiesSlice.reducer;

export const selectAllActivities = (state: { activities: ActivityState }) =>
  state.activities.activities;
export const selectActivityLoading = (state: { activities: ActivityState }) =>
  state.activities.loading;
export const selectActivityError = (state: { activities: ActivityState }) =>
  state.activities.error;
export const selectSelectedActivity = (state: { activities: ActivityState }) =>
  state.activities.activities.find(
    (a) => a.id === state.activities.selectedActivityId,
  );
