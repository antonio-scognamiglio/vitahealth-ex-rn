export type ActivityType =
  | 'Run'
  | 'Ride'
  | 'Swim'
  | 'Walk'
  | 'Hike'
  | 'Gym'
  | 'Yoga';

/**
 * The "raw" data shape from our JSON (DTO = Data Transfer Object).
 * Represents the data as it comes from the API.
 */
export interface ActivityDTO {
  id: string;
  title?: string;
  description?: string;
  type: ActivityType;
  daysAgo: number; // 0 = today, 1 = yesterday, etc.
  duration: number; // in minutes
  distance?: number; // in kilometers
  calories?: number; // in kcal
}

/**
 * The "enriched" data shape our App uses (Domain Model).
 * Contains absolute dates and is ready for UI consumption.
 */
export interface Activity {
  id: string;
  title?: string;
  description?: string;
  type: ActivityType;
  date: string; // ISO 8601 date string (calculated from daysAgo)
  duration: number; // in minutes
  distance?: number; // in kilometers
  calories?: number; // in kcal
}

export interface ActivityState {
  activities: Activity[];
  loading: boolean;
  error: string | null;
  currentActivity: Activity | null;
}
