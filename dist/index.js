import { macroCondition, dependencySatisfies, importSync } from '@embroider/macros';

const luxon = (() => {
  if (macroCondition(dependencySatisfies('luxon', '*'))) {
    return importSync('luxon');
  } else {
    throw new Error(`ember-power-calendar-luxon was unable to detect luxon. Please add the package to your app.`);
  }
})();

/* Sadly the day in which weeks start is not part of the Intl API, so I need to harcode them */
const WEEK_STARTS = {
  af: 1,
  ar: 6,
  'ar-dz': 0,
  'ar-kw': 0,
  'ar-ly': 6,
  'ar-ma': 6,
  'ar-sa': 0,
  'ar-tn': 1,
  az: 1,
  be: 1,
  bg: 1,
  bm: 1,
  bn: 0,
  bo: 0,
  br: 1,
  bs: 1,
  ca: 1,
  cs: 1,
  cv: 1,
  cy: 1,
  da: 1,
  de: 1,
  'de-at': 1,
  'de-ch': 1,
  dv: 7,
  el: 1,
  en: 0,
  'en-au': 1,
  'en-ca': 0,
  'en-gb': 1,
  'en-ie': 1,
  'en-il': 0,
  'en-nz': 1,
  eo: 1,
  es: 1,
  'es-do': 1,
  'es-us': 0,
  et: 1,
  eu: 1,
  fa: 6,
  fi: 1,
  fo: 1,
  fr: 1,
  'fr-ca': 0,
  'fr-ch': 1,
  fy: 1,
  gd: 1,
  gl: 1,
  'gom-latn': 1,
  gu: 0,
  he: 0,
  hi: 0,
  hr: 1,
  hu: 1,
  'hy-am': 1,
  id: 1,
  is: 1,
  it: 1,
  ja: 0,
  jv: 1,
  ka: 1,
  kk: 1,
  km: 1,
  kn: 0,
  ko: 0,
  ky: 1,
  lb: 1,
  lo: 0,
  lt: 1,
  lv: 1,
  me: 1,
  mi: 1,
  mk: 1,
  ml: 0,
  mn: 0,
  mr: 0,
  ms: 1,
  'ms-my': 1,
  mt: 1,
  my: 1,
  nb: 1,
  ne: 0,
  nl: 1,
  'nl-be': 1,
  nn: 1,
  'pa-in': 0,
  pl: 1,
  pt: 1,
  'pt-br': 0,
  ro: 1,
  ru: 1,
  sd: 1,
  se: 1,
  si: 0,
  sk: 1,
  sl: 1,
  sq: 1,
  sr: 1,
  'sr-cyrl': 1,
  ss: 1,
  sv: 1,
  sw: 1,
  ta: 0,
  te: 0,
  tet: 1,
  tg: 1,
  th: 0,
  'tl-ph': 1,
  tlh: 1,
  tr: 1,
  tzl: 1,
  tzm: 6,
  'tzm-latn': 6,
  'ug-cn': 1,
  uk: 1,
  ur: 1,
  uz: 1,
  'uz-latn': 1,
  vi: 1,
  yo: 1,
  'zh-cn': 1,
  'zh-hk': 0,
  'zh-tw': 0
};
function _getWeekdays(dayFormat) {
  const result = [];
  const formatter = new Intl.DateTimeFormat(luxon.Settings.defaultLocale, {
    weekday: dayFormat,
    timeZone: 'UTC'
  });
  for (let i = 4; i <= 10; i++) {
    const dt = luxon.DateTime.utc(1970, 1, i).toJSDate();
    result.push(formatter.format(dt));
  }
  return result;
}
var index = {
  add,
  formatDate,
  startOf,
  endOf,
  weekday,
  isoWeekday,
  getWeekdaysShort,
  getWeekdaysMin,
  getWeekdays,
  isAfter,
  isBefore,
  isSame,
  isBetween,
  diff,
  normalizeDate,
  normalizeRangeActionValue,
  normalizeMultipleActionValue,
  normalizeCalendarDay,
  withLocale,
  normalizeCalendarValue,
  normalizeDuration,
  getDefaultLocale,
  localeStartOfWeek,
  startOfWeek,
  endOfWeek
};
function add(date, quantity, unit) {
  return luxon.DateTime.fromJSDate(date).plus({
    [unit]: quantity
  }).toJSDate();
}
function formatDate(date, format, locale = null) {
  let datetime = luxon.DateTime.isDateTime(date) ? date : luxon.DateTime.fromJSDate(date);
  if (locale) {
    datetime = datetime.setLocale(locale);
  }
  format = format.replace('YYYY', 'yyyy');
  format = format.replace('dddd', 'EEEE');
  format = format.replace('ddd', 'EEE');
  format = format.replace('DD', 'dd');
  return datetime.toFormat(format);
}
function startOf(date, unit) {
  let datetime = luxon.DateTime.fromJSDate(date);
  if (unit === 'week') {
    const normalizedLocale = datetime?.locale?.toLowerCase() ?? '';
    let weekday = WEEK_STARTS[normalizedLocale];
    if (weekday === undefined) {
      const parentLocaleStart = WEEK_STARTS[normalizedLocale.slice(0, 2)];
      weekday = parentLocaleStart === undefined ? 0 : parentLocaleStart; // 'es-ar' defaults to 'es'
    }
    const values = {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      weekday: weekday
    };
    datetime = datetime.set(values);
  } else {
    datetime = datetime.startOf(unit);
  }
  return datetime.toJSDate();
}
function endOf(date, unit) {
  return luxon.DateTime.fromJSDate(date).endOf(unit).toJSDate();
}
function weekday(date) {
  return luxon.DateTime.fromJSDate(date).weekday;
}
function isoWeekday(date) {
  const dayStr = luxon.DateTime.fromJSDate(date).toISOWeekDate()?.split('-')[2] ?? '';
  return parseInt(dayStr, 10);
}
function getWeekdaysShort() {
  return _getWeekdays('short');
}
function getWeekdaysMin() {
  return _getWeekdays('narrow');
}
function getWeekdays() {
  return _getWeekdays('long');
}
function isAfter(date1, date2) {
  return +date1 > +date2;
}
function isBefore(date1, date2) {
  return +date1 < +date2;
}
function isSame(date1, date2, unit) {
  const dt1 = luxon.DateTime.fromJSDate(date1);
  const dt2 = luxon.DateTime.fromJSDate(date2);
  return dt1.hasSame(dt2, unit);
}
function isBetween(date, start, end,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_unit,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_inclusivity) {
  return +start <= +date && +date <= +end;
}
function diff(date1, date2) {
  return luxon.DateTime.fromJSDate(date1).diff(luxon.DateTime.fromJSDate(date2)).as('milliseconds');
}
function normalizeDate(dateOrDateTime) {
  if (dateOrDateTime instanceof Date) {
    return dateOrDateTime;
  } else if (luxon.DateTime.isDateTime(dateOrDateTime)) {
    return dateOrDateTime.toJSDate();
  }
}
function normalizeRangeActionValue(val) {
  return {
    date: val.date,
    datetime: {
      start: val.date.start ? luxon.DateTime.fromJSDate(val.date.start) : val.date.start,
      end: val.date.end ? luxon.DateTime.fromJSDate(val.date.end) : val.date.end
    }
  };
}
function normalizeMultipleActionValue(val) {
  return {
    date: val.date,
    datetime: val.date ? val.date.map(e => luxon.DateTime.fromJSDate(e)) : val.date
  };
}
function normalizeCalendarDay(day) {
  day.datetime = luxon.DateTime.fromJSDate(day.date);
  day.number = parseInt(day.datetime.toFormat('d'), 10);
  return day;
}
function withLocale(locale, fn) {
  let returnValue;
  if (locale) {
    const previousLocale = luxon.Settings.defaultLocale;
    luxon.Settings.defaultLocale = locale;
    returnValue = fn();
    luxon.Settings.defaultLocale = previousLocale;
  } else {
    returnValue = fn();
  }
  return returnValue;
}
function normalizeCalendarValue(value) {
  if (value) {
    return {
      date: value.date,
      datetime: value.date ? luxon.DateTime.fromJSDate(value.date) : undefined
    };
  }
  return {
    date: undefined,
    datetime: undefined
  };
}
const DURATION_UNITS = {
  y: 'years',
  M: 'months',
  w: 'weeks',
  d: 'days',
  h: 'hours',
  m: 'minutes',
  s: 'seconds'
};
function normalizeDuration(value) {
  if (value === null) {
    return null;
  }
  if (value instanceof luxon.Duration) {
    return value.valueOf();
  }
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    const matches = value.match(/(\d+)(.*)/) ?? [];
    const quantity = matches[1] ?? '';
    let units = matches[2]?.trim() || 'days';
    units = DURATION_UNITS[units] || units;
    const duration = luxon.Duration.fromObject({
      [units]: parseInt(quantity, 10)
    });
    return duration.valueOf();
  }
}
function getDefaultLocale() {
  return luxon.Settings.defaultLocale || luxon.DateTime.local().resolvedLocaleOptions().locale;
}
function localeStartOfWeek(locale) {
  const now = new Date();
  const day = withLocale(locale, () => formatDate(startOf(now, 'week'), 'dddd'));
  const idx = withLocale(locale, getWeekdays).indexOf(day);
  return idx >= 0 ? idx : 0;
}
function startOfWeek(day, startOfWeek) {
  while (isoWeekday(day) % 7 !== startOfWeek) {
    day = add(day, -1, 'day');
  }
  return day;
}
function endOfWeek(day, startOfWeek) {
  const eow = (startOfWeek + 6) % 7;
  while (isoWeekday(day) % 7 !== eow) {
    day = add(day, 1, 'day');
  }
  return day;
}

export { add, index as default, diff, endOf, endOfWeek, formatDate, getDefaultLocale, getWeekdays, getWeekdaysMin, getWeekdaysShort, isAfter, isBefore, isBetween, isSame, isoWeekday, localeStartOfWeek, normalizeCalendarDay, normalizeCalendarValue, normalizeDate, normalizeDuration, normalizeMultipleActionValue, normalizeRangeActionValue, startOf, startOfWeek, weekday, withLocale };
//# sourceMappingURL=index.js.map
