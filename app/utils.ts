export const convertUtcToLocal = (utcTimestamp: string): string => {
    // Parse the UTC timestamp into a Date object
    // Z is added to make it timezone aware
    const date = new Date(utcTimestamp + 'Z');
  
    // Get the local date and time
    const localDateString = date.toLocaleString();
  
    return localDateString;
  };