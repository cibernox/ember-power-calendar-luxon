import { normalizeCalendarValue } from 'ember-power-calendar-luxon';
import { Settings } from 'luxon';

export function normalizeCalendarValueInTimeZone(zoneName, date) {
  Settings.defaultZone = 'UTC';
  return normalizeCalendarValue({
    date,
  }).datetime;
}
