const MINUTE_IN_MS = 1000 * 60;

export function formatDate(dateStr) {
  if (!dateStr) return 'N/A';

  const [year, month, day] = String(dateStr).split('-');
  return year && month && day ? `${day}/${month}/${year}` : String(dateStr);
}

export function parseLocalDate(dateStr, hour = 0, minute = 0, second = 0, millisecond = 0) {
  const [year, month, day] = String(dateStr).split('-').map(Number);
  if (![year, month, day].every(Number.isFinite)) return new Date(dateStr);
  return new Date(year, month - 1, day, hour, minute, second, millisecond);
}

function getGymHoursForDate(date) {
  const day = date.getDay();
  if (day >= 1 && day <= 5) return { openHour: 6, closeHour: 22 };
  if (day === 6) return { openHour: 6, closeHour: 14 };
  return null;
}

export function getGymWindowForDateStr(dateStr) {
  const hours = getGymHoursForDate(parseLocalDate(dateStr));
  if (!hours) return null;

  return {
    start: parseLocalDate(dateStr, hours.openHour),
    end: parseLocalDate(dateStr, hours.closeHour)
  };
}

function formatRemaining(diffMs) {
  const totalMinutes = Math.floor(Math.max(0, diffMs) / MINUTE_IN_MS);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) return `${days} día${days > 1 ? 's' : ''} ${hours}h`;
  if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''} ${minutes} min`;
  return `${minutes} min`;
}

export function isDayPassMembership(membershipType, durationDays) {
  return durationDays === 1 || membershipType.toLowerCase().includes('day');
}

export function calculateTimeRemaining(
  endDateStr,
  { isDayPass = false, dayPassBaseDate = null, now = new Date() } = {}
) {
  if (!endDateStr) return 'Sin fecha';

  if (isDayPass) {
    const baseDateStr = dayPassBaseDate || endDateStr;
    const todayWindow = getGymWindowForDateStr(baseDateStr);
    if (!todayWindow) return 'Gimnasio cerrado';
    if (now >= todayWindow.end) return 'Vencida';
    if (now <= todayWindow.start) return formatRemaining(todayWindow.end - todayWindow.start);
    return formatRemaining(todayWindow.end - now);
  }

  const endDate = parseLocalDate(endDateStr);
  const isEndDateToday = now.toDateString() === endDate.toDateString();

  if (isEndDateToday) {
    const todayWindow = getGymWindowForDateStr(endDateStr);
    if (!todayWindow) return 'Gimnasio cerrado';
    if (now >= todayWindow.end) return 'Vencida';
    return formatRemaining(todayWindow.end - now);
  }

  if (now < endDate) {
    const endDayWindow = getGymWindowForDateStr(endDateStr);
    if (!endDayWindow) return 'Vigente';
    if (now >= endDayWindow.end) return 'Vencida';
    return formatRemaining(endDayWindow.end - now);
  }

  return 'Vencida';
}

export function isMembershipValid(membership, isDayPass, now = new Date()) {
  if (!membership?.end_date) return true;

  if (isDayPass) {
    const dayWindow = getGymWindowForDateStr(membership.start_date || membership.end_date);
    return Boolean(dayWindow && now <= dayWindow.end);
  }

  const endDate = parseLocalDate(membership.end_date);
  const endCutoff = parseLocalDate(membership.end_date, 22);
  if (now < endDate) return true;
  return now.toDateString() === endDate.toDateString() && now <= endCutoff;
}

export function calculateMembershipProgress(membership, isDayPass, now = new Date()) {
  if (!membership?.end_date) return 0;

  if (isDayPass) {
    const window = getGymWindowForDateStr(membership.start_date || membership.end_date);
    if (!window) return 0;
    return progressBetween(window.start, window.end, now);
  }

  if (!membership.start_date) return 0;
  const startWindow = getGymWindowForDateStr(membership.start_date);
  const endWindow = getGymWindowForDateStr(membership.end_date);
  const start = startWindow?.start || parseLocalDate(membership.start_date, 6);
  const end = endWindow?.end || parseLocalDate(membership.end_date, 22);
  return progressBetween(start, end, now);
}

function progressBetween(start, end, now) {
  const total = end - start;
  if (total <= 0) return 0;

  const remaining = Math.max(0, Math.min(end - now, total));
  let percentage = (remaining / total) * 100;
  if (percentage > 0 && percentage < 5) percentage = 5;
  return percentage;
}
