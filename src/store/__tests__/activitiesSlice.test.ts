import activitiesReducer, {
  setSelectedActivity,
  clearSelectedActivity,
  selectCurrentWeekActivities,
} from "../activitiesSlice";
import { ActivityDTO, ActivityState } from "../../types/activity";
import { mapDtoToActivity } from "../../mappers/activityMapper";

describe("Activity Tests", () => {
  describe("activitiesSlice", () => {
    const currentDto: ActivityDTO = {
      id: "current",
      type: "Run",
      daysAgo: 0,
      duration: 30,
    };
    const pastDto: ActivityDTO = {
      id: "past",
      type: "Walk",
      daysAgo: 14,
      duration: 60,
    };
    const futureDto: ActivityDTO = {
      id: "future",
      type: "Gym",
      daysAgo: -5,
      duration: 45,
    };

    const currentActivity = mapDtoToActivity(currentDto);
    const pastActivity = mapDtoToActivity(pastDto);
    const futureActivity = mapDtoToActivity(futureDto);

    it("should handle initial state", () => {
      const expected: ActivityState = {
        activities: [],
        loading: false,
        error: null,
        currentActivity: null,
      };
      expect(activitiesReducer(undefined, { type: "@@INIT" })).toEqual(
        expected,
      );
    });

    it("should handle setSelectedActivity", () => {
      const initialState: ActivityState = {
        activities: [],
        loading: false,
        error: null,
        currentActivity: null,
      };
      const nextState = activitiesReducer(
        initialState,
        setSelectedActivity(currentActivity),
      );
      expect(nextState.currentActivity).toEqual(currentActivity);
    });

    it("should handle clearSelectedActivity", () => {
      const initialState = {
        activities: [],
        loading: false,
        error: null,
        currentActivity: currentActivity,
      };
      const nextState = activitiesReducer(
        initialState,
        clearSelectedActivity(),
      );
      expect(nextState.currentActivity).toBeNull();
    });

    it("should filter only current week activities", () => {
      const rootState = {
        activities: {
          activities: [currentActivity, pastActivity, futureActivity],
          loading: false,
          error: null,
          currentActivity: null,
        } as ActivityState,
      };

      const result = selectCurrentWeekActivities(rootState);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("current");

      expect(result.find((a) => a.id === "past")).toBeUndefined();
      expect(result.find((a) => a.id === "future")).toBeUndefined();
    });
  });
});
