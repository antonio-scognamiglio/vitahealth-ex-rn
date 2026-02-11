import activitiesData from "../data/activities.json";
import { Activity, ActivityDTO } from "../types/activity";
import { mapDtoToActivity } from "../mappers/activityMapper";

const SIMULATED_DELAY_MS = 1500;

export const activityService = {
  fetchActivities: async (): Promise<Activity[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Transform DTO (daysAgo) -> Model (ISO date)
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
