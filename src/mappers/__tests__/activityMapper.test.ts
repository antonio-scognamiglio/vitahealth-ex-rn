import { mapDtoToActivity } from "../activityMapper";
import { ActivityDTO } from "../../types/activity";
import { isSameDay, parseISO, subDays, addDays } from "date-fns";

describe("activityMapper", () => {
  describe("mapDtoToActivity", () => {
    it("should correctly map daysAgo: 0 to today's date", () => {
      const dto: ActivityDTO = {
        id: "1",
        type: "Run",
        daysAgo: 0,
        duration: 30,
      };
      const activity = mapDtoToActivity(dto);
      expect(isSameDay(parseISO(activity.date), new Date())).toBe(true);
    });

    it("should correctly map daysAgo: 10 to 10 days ago (PAST)", () => {
      const dto: ActivityDTO = {
        id: "2",
        type: "Swim",
        daysAgo: 10,
        duration: 45,
      };
      const activity = mapDtoToActivity(dto);
      const expectedDate = subDays(new Date(), 10);
      expect(isSameDay(parseISO(activity.date), expectedDate)).toBe(true);
    });

    it("should correctly map daysAgo: -5 to 5 days in future (FUTURE)", () => {
      const dto: ActivityDTO = {
        id: "3",
        type: "Walk",
        daysAgo: -5,
        duration: 20,
      };
      const activity = mapDtoToActivity(dto);
      const expectedDate = addDays(new Date(), 5);
      expect(isSameDay(parseISO(activity.date), expectedDate)).toBe(true);
    });
  });
});
