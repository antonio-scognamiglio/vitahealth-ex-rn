import activitiesData from '../data/activities.json';
import { Activity, ActivityDTO } from '../types/activity';
import { mapDtoToActivity } from '../mappers/activityMapper';

const SIMULATED_DELAY_MS = 1500;

/**
 * Simulated backend service.
 * Fetches activities from a local JSON and applies a network delay.
 */
export const activityService = {
  fetchActivities: async (): Promise<Activity[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const activities: Activity[] = (activitiesData as ActivityDTO[]).map(
          (dto) => {
            return mapDtoToActivity(dto);
          },
        );

        resolve(activities);
      }, SIMULATED_DELAY_MS);
    });
  },
};
