import React from 'react';
import { screen, fireEvent } from '@testing-library/react-native';
import { renderWithProviders } from '../../test-utils';
import { ActivityListScreen } from '../ActivityListScreen';
import * as useActivitiesHook from '../../hooks/useActivities';

import { useRouter } from 'expo-router';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

// Mock useActivities hook
jest.mock('../../hooks/useActivities');

describe('ActivityListScreen', () => {
  const mockPush = jest.fn();
  const mockSelectActivity = jest.fn();
  const mockRetryFetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('should display loading state when hook returns loading', () => {
    (useActivitiesHook.useActivities as jest.Mock).mockReturnValue({
      activities: [],
      loading: true,
      error: null,
      selectActivity: mockSelectActivity,
      retryFetch: mockRetryFetch,
    });

    renderWithProviders(<ActivityListScreen />);

    expect(screen.getByTestId('activity-loading')).toBeTruthy();
  });

  it('should display error state when hook returns error', () => {
    (useActivitiesHook.useActivities as jest.Mock).mockReturnValue({
      activities: [],
      loading: false,
      error: 'Failed to fetch',
      selectActivity: mockSelectActivity,
      retryFetch: mockRetryFetch,
    });

    renderWithProviders(<ActivityListScreen />);

    expect(screen.getByTestId('activity-error')).toBeTruthy();
  });

  it('should call retryFetch when retry button is pressed', () => {
    (useActivitiesHook.useActivities as jest.Mock).mockReturnValue({
      activities: [],
      loading: false,
      error: 'Failed to fetch',
      selectActivity: mockSelectActivity,
      retryFetch: mockRetryFetch,
    });

    renderWithProviders(<ActivityListScreen />);

    const retryButton = screen.getByText('Retry');
    fireEvent.press(retryButton);

    expect(mockRetryFetch).toHaveBeenCalled();
  });

  it('should display empty state when hook returns no activities', () => {
    (useActivitiesHook.useActivities as jest.Mock).mockReturnValue({
      activities: [],
      loading: false,
      error: null,
      selectActivity: mockSelectActivity,
      retryFetch: mockRetryFetch,
    });

    renderWithProviders(<ActivityListScreen />);

    expect(screen.getByTestId('activity-empty')).toBeTruthy();
  });

  it('should display activity items and handle press', () => {
    const mockActivity = {
      id: '1',
      type: 'Run',
      date: '2023-10-10T12:00:00Z',
      duration: 30,
    };

    (useActivitiesHook.useActivities as jest.Mock).mockReturnValue({
      activities: [mockActivity],
      loading: false,
      error: null,
      selectActivity: mockSelectActivity,
      retryFetch: mockRetryFetch,
    });

    renderWithProviders(<ActivityListScreen />);

    expect(screen.getByText('Run')).toBeTruthy();

    const item = screen.getByText('Run');
    fireEvent.press(item);

    expect(mockSelectActivity).toHaveBeenCalledWith(mockActivity);
    expect(mockPush).toHaveBeenCalledWith('/1');
  });
});
