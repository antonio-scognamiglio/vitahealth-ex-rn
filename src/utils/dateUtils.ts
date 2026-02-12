import { format, parseISO } from 'date-fns';

const formatDate = (dateString: string, formatStr: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch (error) {
    console.warn('Invalid date format', error);
    return 'Invalid Date';
  }
};

/**
 * Formats an ISO date string into a user-friendly format.
 * @param dateString - The ISO date string to format.
 * @returns Formatted date string (e.g., "Monday, 12 February, 15:30") or "Invalid Date" on error.
 */
export const formatActivityDate = (dateString: string): string =>
  formatDate(dateString, 'EEEE, d MMMM, HH:mm');
