import { format, parseISO } from "date-fns";

const formatDate = (dateString: string, formatStr: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch (error) {
    console.warn("Invalid date format", error);
    return "Invalid Date";
  }
};

export const formatActivityDate = (dateString: string): string =>
  formatDate(dateString, "EEEE, d MMMM, HH:mm");
