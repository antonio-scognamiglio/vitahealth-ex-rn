import React from 'react';
import { screen, fireEvent } from '@testing-library/react-native';
import { renderWithProviders } from '../../test-utils';
import { ActivityDetailScreen } from '../ActivityDetailScreen';
import * as useActivityDetailHook from '../../hooks/useActivityDetail';
import { Activity } from '../../types/activity';
import { formatActivityDate } from '../../utils/dateUtils';

// Mock the hook
jest.mock('../../hooks/useActivityDetail');

describe('ActivityDetailScreen', () => {
  const mockGoBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display activity details when activity is present', () => {
    const mockActivity: Activity = {
      id: '1',
      type: 'Run',
      title: 'Morning Run',
      date: '2023-10-10T08:00:00Z',
      duration: 30,
      distance: 5,
      calories: 300,
    } as Activity;

    const expectedDate = formatActivityDate(mockActivity.date);

    (useActivityDetailHook.useActivityDetail as jest.Mock).mockReturnValue({
      activity: mockActivity,
      formattedDate: expectedDate,
      goBack: mockGoBack,
    });

    renderWithProviders(<ActivityDetailScreen />);

    expect(screen.getByText('Run')).toBeTruthy();
    expect(screen.getByText(expectedDate)).toBeTruthy();
    expect(screen.getByText('Morning Run')).toBeTruthy();
    expect(screen.getByText('30 min')).toBeTruthy();
    expect(screen.getByText('5 km')).toBeTruthy();
    expect(screen.getByText('300 kcal')).toBeTruthy();
  });

  it('should not display distance or calories if they are missing', () => {
    const mockActivity: Activity = {
      id: '2',
      type: 'Yoga',
      date: '2023-10-11T08:00:00Z',
      duration: 45,
      distance: undefined,
      calories: undefined,
    } as Activity;

    const expectedDate = formatActivityDate(mockActivity.date);

    (useActivityDetailHook.useActivityDetail as jest.Mock).mockReturnValue({
      activity: mockActivity,
      formattedDate: expectedDate,
      goBack: mockGoBack,
    });

    renderWithProviders(<ActivityDetailScreen />);

    expect(screen.queryByText('Distance')).toBeNull();
    expect(screen.queryByText('Calories')).toBeNull();
    expect(screen.getByText('45 min')).toBeTruthy();
  });

  it('should display error state if no activity is found', () => {
    (useActivityDetailHook.useActivityDetail as jest.Mock).mockReturnValue({
      activity: null,
      formattedDate: '',
      goBack: mockGoBack,
    });

    renderWithProviders(<ActivityDetailScreen />);

    expect(screen.getByTestId('activity-detail-error')).toBeTruthy();
    expect(screen.getByText('No Activity Selected')).toBeTruthy();

    const backButton = screen.getByText('Back to List');
    fireEvent.press(backButton);
    expect(mockGoBack).toHaveBeenCalled();
  });
});
