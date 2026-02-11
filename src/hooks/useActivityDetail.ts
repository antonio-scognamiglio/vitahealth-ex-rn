import { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import {
  selectCurrentActivity,
  clearSelectedActivity,
} from "../store/activitiesSlice";
import { AppDispatch } from "../store";
import { formatActivityDate } from "../utils/dateUtils";

export const useActivityDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const activity = useSelector(selectCurrentActivity);

  // Clear selected activity on unmount
  useEffect(() => {
    return () => {
      dispatch(clearSelectedActivity());
    };
  }, [dispatch]);

  const formattedDate = useMemo(() => {
    return activity ? formatActivityDate(activity.date) : "";
  }, [activity]);

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    activity,
    formattedDate,
    goBack,
  };
};
