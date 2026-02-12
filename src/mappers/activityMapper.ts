import { subDays } from 'date-fns';
import { Activity, ActivityDTO } from '../types/activity';

/**
 * Transforms the DTO from the API into the application's internal model.
 * Specifically, it converts the relative `daysAgo` field into an absolute ISO date string based on the current time.
 * This ensures the mock data is always relevant to the "Current Week" regardless of when the app is run.
 */
export const mapDtoToActivity = (dto: ActivityDTO): Activity => {
  const { daysAgo, ...rest } = dto;
  return {
    ...rest,
    date: subDays(new Date(), daysAgo).toISOString(),
  };
};
