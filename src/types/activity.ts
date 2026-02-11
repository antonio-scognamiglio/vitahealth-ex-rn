export type ActivityType =
  | "Run"
  | "Ride"
  | "Swim"
  | "Walk"
  | "Hike"
  | "Gym"
  | "Yoga";

// The "raw" data shape from our JSON (DTO = Data Transfer Object)
export interface ActivityDTO {
  id: string;
  title?: string;
  description?: string;
  type: ActivityType;
  daysAgo: number; // 0 = today, 1 = yesterday, etc.
  duration: number;
  distance?: number;
  calories?: number;
}

// The "enriched" data shape our App uses (Domain Model)
export interface Activity {
  id: string;
  title?: string;
  description?: string;
  type: ActivityType;
  date: string; // ISO 8601 date string (calculated from daysAgo)
  duration: number; // in minutes
  distance?: number; // in kilometers (optional)
  calories?: number;
}

export interface ActivityState {
  activities: Activity[];
  loading: boolean;
  error: string | null;
  currentActivity: Activity | null;
}
