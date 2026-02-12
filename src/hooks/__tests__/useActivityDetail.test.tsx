import React from 'react';
import { renderHook } from '@testing-library/react-native';
import { useActivityDetail } from '../useActivityDetail';
import { renderWithProviders } from '../../test-utils';
import {
  setSelectedActivity,
  clearSelectedActivity,
} from '../../store/activitiesSlice';
import { Activity } from '../../types/activity';
import { Provider } from 'react-redux';
import { formatActivityDate } from '../../utils/dateUtils';

// Mock router.back
const mockBack = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe('useActivityDetail hook', () => {
  const mockActivity: Activity = {
    id: '1',
    type: 'Run',
    date: '2023-10-10T12:00:00Z',
    duration: 30,
  } as Activity;

  it('should return the current activity and formatted date', () => {
    const { store } = renderWithProviders(<React.Fragment />);

    // Set the activity in the store
    store.dispatch(setSelectedActivity(mockActivity));

    const { result } = renderHook(() => useActivityDetail(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.activity).toEqual(mockActivity);
    expect(result.current.formattedDate).toBe(
      formatActivityDate(mockActivity.date),
    );
  });

  it('should call clearSelectedActivity on unmount', () => {
    const { store } = renderWithProviders(<React.Fragment />);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const { unmount } = renderHook(() => useActivityDetail(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    unmount();

    // Verify clearSelectedActivity was dispatched
    const clearActionType = clearSelectedActivity.type;
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: clearActionType }),
    );
  });

  it('should provide a goBack function', () => {
    const { store } = renderWithProviders(<React.Fragment />);

    const { result } = renderHook(() => useActivityDetail(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    result.current.goBack();
    expect(typeof result.current.goBack).toBe('function');
  });
});
