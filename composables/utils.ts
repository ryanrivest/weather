// Formats a date string (e.g. 2024-02-17 00:00) into a short time string (e.g. 12:00 AM).
export function formatTime(date: string): string {
  return formatShortTime(new Date(date));
}

// Formats a time string (e.g. 06:48 AM) into a short time string (e.g. 6:48 AM).
export function formatTimeString(time: string): string {
  return formatShortTime(new Date(`1970-01-01 ${time}`));
}

function formatShortTime(date: Date): string {
  const shortTime = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' });
  return shortTime.format(date);
}

export function formatTemp(temp: number): string {
  return `${formatInteger(temp)}°`;
}

export function formatPercent(temp: number): string {
  return `${formatInteger(temp)}%`;
}

export function formatSpeed(speed: number, isMetric: boolean): string {
  const suffix = isMetric ? 'km/h' : 'mph';
  return `${formatInteger(speed)} ${suffix}`;
}

export function formatDistance(distance: number, isMetric: boolean): string {
  const suffix = isMetric ? 'km' : 'mi';
  return `${formatInteger(distance)} ${suffix}`;
}

export function formatPressure(pressure: number, isMetric: boolean): string {
  const suffix = isMetric ? 'mb' : 'in';
  return `${formatInteger(pressure)} ${suffix}`;
}

export function formatInteger(number: number): string {
  return Math.round(number).toString();
}
