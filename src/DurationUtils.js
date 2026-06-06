// Utility functions for parsing and handling durations

export function parseDuration(durationString) {
  // Parse ISO 8601 duration format: P[n]Y[n]M[n]DT[n]H[n]M[n]S
  // Examples: PT2H45M, PT30M, PT1H
  const regex = /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/;
  const match = durationString.match(regex);

  if (!match) {
    console.warn(`Invalid duration format: ${durationString}`);
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    years: parseInt(match[1] || 0),
    months: parseInt(match[2] || 0),
    days: parseInt(match[3] || 0),
    hours: parseInt(match[4] || 0),
    minutes: parseInt(match[5] || 0),
    seconds: parseFloat(match[6] || 0)
  };
}

export function durationToString(duration) {
  if (typeof duration === 'string') {
    return duration;
  }

  const parts = [];
  if (duration.hours) parts.push(`${duration.hours} hour(s)`);
  if (duration.minutes) parts.push(`${duration.minutes} minute(s)`);
  if (duration.seconds) parts.push(`${Math.round(duration.seconds)} second(s)`);

  return parts.join(' and ') || "0 minutes";
}

export function getTotalMinutes(duration) {
  if (typeof duration === 'string') {
    const parsed = parseDuration(duration);
    return parsed.hours * 60 + parsed.minutes + Math.floor(parsed.seconds / 60);
  }
  return duration.hours * 60 + duration.minutes + Math.floor(duration.seconds / 60);
}

export function minutesToDurationString(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} hours and ${minutes} minutes`;
}
