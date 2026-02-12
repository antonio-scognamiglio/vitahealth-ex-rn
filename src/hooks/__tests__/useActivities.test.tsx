import React from 'react';
import { renderHook, waitFor, act } from '@testing-library/react-native';
import { useActivities } from '../useActivities';
import { renderWithProviders } from '../../test-utils';
import { activityService } from '../../services/activityService';
import { Activity } from '../../types/activity';
import { Provider } from 'react-redux';

// Mock activityService
jest.mock('../../services/activityService');

describe('useActivities hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Freeze time to Tuesday, 2023-10-10 to ensure consistent "Current Week" filtering
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-10-10T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should dispatch fetchActivities on mount and update loading state', async () => {
    const mockActivities: Activity[] = [
      {
        id: '1',
        type: 'Run',
        date: '2023-10-09T08:00:00Z', // Monday
        duration: 30,
      } as Activity,
    ];

    // Mock a successful API response with a small delay
    (activityService.fetchActivities as jest.Mock).mockReturnValue(
      new Promise((resolve) => setTimeout(() => resolve(mockActivities), 50)),
    );

    const { store } = renderWithProviders(<React.Fragment />);

    const { result } = renderHook(() => useActivities(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    // Check initial loading state
    expect(result.current.loading).toBe(true);

    // Wait for update
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Verify activities are loaded and filtered
    expect(result.current.activities).toHaveLength(1);
    expect(result.current.activities[0]).toMatchObject({
      type: 'Run',
    });
  });

  it('should handle error state', async () => {
    (activityService.fetchActivities as jest.Mock).mockRejectedValue(
      new Error('Fail'),
    );

    const { store } = renderWithProviders(<React.Fragment />);

    const { result } = renderHook(() => useActivities(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('Fail');
  });

  it('should provide a retryFetch function', async () => {
    (activityService.fetchActivities as jest.Mock).mockRejectedValueOnce(
      new Error('First Fail'),
    );

    const { store } = renderWithProviders(<React.Fragment />);

    const { result } = renderHook(() => useActivities(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('First Fail');

    // Retry with success
    (activityService.fetchActivities as jest.Mock).mockResolvedValueOnce([]);

    // Call retryFetch
    await act(async () => {
      result.current.retryFetch();
    });

    // Verify it transitioned back to success
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
  });
});
