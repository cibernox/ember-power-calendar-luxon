import { DateTime, Settings, Duration } from 'luxon';

function _getWeekdays(dayFormat) {
  let result = [];
  let date = new Date(0);
  let formatter = new Intl.DateTimeFormat(Settings.defaultLocale, { weekday: dayFormat });
  for (let day = 4; day <= 10; day++) {
    date.setDate(day);
    result.push(formatter.format(date));
  }
  return result;
}

export function add(date, quantity, unit) {
  return DateTime.fromJSDate(date)
    .plus({ [unit]: quantity })
    .toJSDate();
}

export function formatDate(date, format, locale = null) {
  let datetime = DateTime.fromJSDate(date);
  if (locale) {
    datetime = datetime.setLocale(locale);
  }
  format = format.replace('YYYY', 'yyyy')
  format = format.replace('dddd', 'EEEE');
  format = format.replace('ddd', 'EEE');
  format = format.replace('DD', 'dd');
  return datetime.toFormat(format);
}

export function startOf(date, unit) {
  return DateTime.fromJSDate(date).startOf(unit).toJSDate();
}

export function endOf(date, unit) {
  return DateTime.fromJSDate(date).endOf(unit).toJSDate();
}

export function weekday(date) {
  return DateTime.fromJSDate(date).weekday;
}

export function isoWeekday(date) {
  let dayStr = DateTime.fromJSDate(date).toISOWeekDate().split('-')[2];
  return parseInt(dayStr, 10);
}

export function getWeekdaysShort() {
  return _getWeekdays('short');
}

export function getWeekdaysMin() {
  return _getWeekdays('narrow');
}

export function getWeekdays() {
  return _getWeekdays('long');
}

export function isAfter(date1, date2) {
  return +date1 > +date2;
}

export function isBefore(date1, date2) {
  return +date1 < +date2;
}

export function isSame(date1, date2, unit) {
  let dt1 = DateTime.fromJSDate(date1)
  let dt2 = DateTime.fromJSDate(date2)
  return dt1.hasSame(dt2, unit);
}

export function isBetween(date, start, end) {
  return +start <= +date && +date <= +end;
}

export function diff(date1, date2) {
  return DateTime.fromJSDate(date1).diff(DateTime.fromJSDate(date2));
}

export function normalizeDate(dateOrDatetime) {
  if (
    dateOrDatetime === undefined ||
    dateOrDatetime === null ||
    dateOrDatetime instanceof Date
  ) {
    return dateOrDatetime;
  } else {
    return dateOrDatetime.toJSDate();
  }
}

export function normalizeRangeActionValue(val) {
  return {
    date: val.date,
    datetime: {
      start: val.date.start ? DateTime.fromJSDate(val.date.start) : val.date.start,
      end: val.date.end ? DateTime.fromJSDate(val.date.end) : val.date.end
    }
  };
}

export function normalizeMultipleActionValue(val) {
  return {
    date: val.date,
    datetime: val.date ? val.date.map(e => DateTime.fromJSDate(e)) : val.date
  };
}

export function normalizeCalendarDay(day) {
  day.datetime = DateTime.fromJSDate(day.date);
  return day;
}

export function withLocale(locale, fn) {
  let returnValue;
  if (locale) {
    let previousLocale = Settings.defaultLocale;
    Settings.defaultLocale = locale;
    returnValue = fn();
    Settings.defaultLocale = previousLocale;
  } else {
    returnValue = fn();
  }
  return returnValue;
}

export function normalizeCalendarValue(value) {
  if (value) {
    return { date: value.date, datetime: value.date ? DateTime.fromJSDate(value.date) : undefined };
  }
  return { date: undefined, datetime: undefined };
}

const DURATION_UNITS = {
  y: 'years',
  M: 'months',
  w: 'weeks',
  d: 'days',
  h: 'hours',
  m: 'minutes',
  s: 'seconds'
}

export function normalizeDuration(value) {
  if (value === null) {
    return null;
  }
  if (value instanceof Duration) {
    return value.valueOf();
  }
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    let [, quantity, units] = value.match(/(\d+)(.*)/);
    units = units.trim() || "days";
    units = DURATION_UNITS[units] || units;
    let duration = Duration.fromObject({ [units]: parseInt(quantity, 10) });
    return duration.valueOf();
  }
}

export function getDefaultLocale() {
  return Settings.defaultLocale || DateTime.local().resolvedLocaleOpts().locale;
}
