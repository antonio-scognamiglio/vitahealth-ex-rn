import { subDays } from "date-fns";
import { Activity, ActivityDTO } from "../types/activity";

export const mapDtoToActivity = (dto: ActivityDTO): Activity => {
  const { daysAgo, ...rest } = dto;
  return {
    ...rest,
    date: subDays(new Date(), daysAgo).toISOString(),
  };
};
