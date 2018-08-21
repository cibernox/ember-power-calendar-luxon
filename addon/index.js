import { DateTime, Settings } from "luxon";

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

export function isBetween(/*date, start, end, unit, inclusivity*/) {
  throw new Error("Not implemented");
}

export function diff(/*date1, date2*/) {
  throw new Error("Not implemented");
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

export function normalizeRangeActionValue(/*val*/) {
  throw new Error("Not implemented");
}

export function normalizeMultipleActionValue(/*val*/) {
  throw new Error("Not implemented");
}

export function normalizeCalendarDay(day) {
  day.luxon = DateTime.fromJSDate(day.date);
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

export function normalizeCalendarValue(/*value*/) {
  throw new Error("Not implemented");
}

export function normalizeDuration(/*value*/) {
  throw new Error("Not implemented");
}

export function getDefaultLocale() {
  return Settings.defaultLocale || DateTime.local().resolvedLocaleOpts().locale;
}
