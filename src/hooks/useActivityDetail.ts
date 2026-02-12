import { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import {
  selectCurrentActivity,
  clearSelectedActivity,
} from '../store/activitiesSlice';
import { AppDispatch } from '../store';
import { formatActivityDate } from '../utils/dateUtils';

/**
 * Custom hook to manage the Activity Detail screen logic.
 * Handles data selection and cleanup on unmount.
 */
export const useActivityDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const activity = useSelector(selectCurrentActivity);

  // Reset state when leaving the screen
  useEffect(() => {
    return () => {
      dispatch(clearSelectedActivity());
    };
  }, [dispatch]);

  const formattedDate = useMemo(() => {
    return activity ? formatActivityDate(activity.date) : '';
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
