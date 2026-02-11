import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActivities,
  setSelectedActivity,
  selectCurrentWeekActivities,
  selectActivityLoading,
  selectActivityError,
} from "../store/activitiesSlice";
import { AppDispatch } from "../store";
import { Activity } from "../types/activity";

export const useActivities = () => {
  const dispatch = useDispatch<AppDispatch>();

  const activities = useSelector(selectCurrentWeekActivities);
  const loading = useSelector(selectActivityLoading);
  const error = useSelector(selectActivityError);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const selectActivity = useCallback(
    (activity: Activity) => {
      dispatch(setSelectedActivity(activity));
    },
    [dispatch],
  );

  const retryFetch = useCallback(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  return {
    activities,
    loading,
    error,
    selectActivity,
    retryFetch,
  };
};
