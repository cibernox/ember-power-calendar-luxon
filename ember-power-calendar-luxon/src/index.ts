import {
  dependencySatisfies,
  macroCondition,
  importSync,
} from '@embroider/macros';
import type * as LuxonNs from 'luxon';
import type {
  Duration,
  DateTime,
  DateTimeFormatOptions,
  DateTimeUnit,
  DateObjectUnits,
} from 'luxon';
import type {
  NormalizeCalendarValue,
  NormalizeMultipleActionValue,
  NormalizeRangeActionValue,
  PowerCalendarDay,
} from 'ember-power-calendar/utils';

const luxon: typeof LuxonNs = (() => {
  if (macroCondition(dependencySatisfies('luxon', '*'))) {
    return importSync('luxon') as typeof LuxonNs;
  } else {
    throw new Error(
      `ember-power-calendar-luxon was unable to detect luxon. Please add the package to your app.`,
    );
  }
})();

/* Sadly the day in which weeks start is not part of the Intl API, so I need to harcode them */
const WEEK_STARTS: {
  [key: string]: number;
} = {
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
  'zh-tw': 0,
};

function _getWeekdays(dayFormat: string) {
  const result: string[] = [];
  const formatter = new Intl.DateTimeFormat(luxon.Settings.defaultLocale, {
    weekday: dayFormat as DateTimeFormatOptions['weekday'],
    timeZone: 'UTC',
  });
  for (let i = 4; i <= 10; i++) {
    const dt = luxon.DateTime.utc(1970, 1, i).toJSDate();
    result.push(formatter.format(dt));
  }
  return result;
}

export default {
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
  endOfWeek,
};

export function add(date: Date, quantity: number, unit: string): Date {
  return luxon.DateTime.fromJSDate(date)
    .plus({ [unit]: quantity })
    .toJSDate();
}

export function formatDate(
  date: Date,
  format: string,
  locale: string | null = null,
): string {
  let datetime = luxon.DateTime.isDateTime(date)
    ? date
    : luxon.DateTime.fromJSDate(date);
  if (locale) {
    datetime = datetime.setLocale(locale);
  }
  format = format.replace('YYYY', 'yyyy');
  format = format.replace('dddd', 'EEEE');
  format = format.replace('ddd', 'EEE');
  format = format.replace('DD', 'dd');
  return datetime.toFormat(format);
}

export function startOf(date: Date, unit: string): Date {
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
      weekday: weekday as DateObjectUnits['weekday'],
    };
    datetime = datetime.set(values);
  } else {
    datetime = datetime.startOf(unit as DateTimeUnit);
  }
  return datetime.toJSDate();
}

export function endOf(date: Date, unit: string): Date {
  return luxon.DateTime.fromJSDate(date)
    .endOf(unit as DateTimeUnit)
    .toJSDate();
}

export function weekday(date: Date): number {
  return luxon.DateTime.fromJSDate(date).weekday;
}

export function isoWeekday(date: Date): number {
  const dayStr =
    luxon.DateTime.fromJSDate(date).toISOWeekDate()?.split('-')[2] ?? '';
  return parseInt(dayStr, 10);
}

export function getWeekdaysShort(): string[] {
  return _getWeekdays('short');
}

export function getWeekdaysMin(): string[] {
  return _getWeekdays('narrow');
}

export function getWeekdays(): string[] {
  return _getWeekdays('long');
}

export function isAfter(date1: Date, date2: Date): boolean {
  return +date1 > +date2;
}

export function isBefore(date1: Date, date2: Date): boolean {
  return +date1 < +date2;
}

export function isSame(date1: Date, date2: Date, unit: string): boolean {
  const dt1 = luxon.DateTime.fromJSDate(date1);
  const dt2 = luxon.DateTime.fromJSDate(date2);
  return dt1.hasSame(dt2, unit as DateTimeUnit);
}

export function isBetween(
  date: Date,
  start: Date,
  end: Date,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _unit?: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _inclusivity?: string,
): boolean {
  return +start <= +date && +date <= +end;
}

export function diff(date1: Date, date2: Date): number {
  return luxon.DateTime.fromJSDate(date1)
    .diff(luxon.DateTime.fromJSDate(date2))
    .as('milliseconds');
}

export function normalizeDate(dateOrDateTime?: unknown): Date | undefined {
  if (dateOrDateTime instanceof Date) {
    return dateOrDateTime;
  } else if (luxon.DateTime.isDateTime(dateOrDateTime)) {
    return (dateOrDateTime as DateTime).toJSDate();
  }
}

export function normalizeRangeActionValue(val: {
  date: {
    start?: Date | null;
    end?: Date | null;
  };
}): NormalizeRangeActionValue {
  return {
    date: val.date,
    datetime: {
      start: val.date.start
        ? luxon.DateTime.fromJSDate(val.date.start)
        : val.date.start,
      end: val.date.end
        ? luxon.DateTime.fromJSDate(val.date.end)
        : val.date.end,
    },
  };
}

export function normalizeMultipleActionValue(val: {
  date: Date[];
}): NormalizeMultipleActionValue {
  return {
    date: val.date,
    datetime: val.date
      ? val.date.map((e) => luxon.DateTime.fromJSDate(e))
      : val.date,
  };
}

export function normalizeCalendarDay(day: PowerCalendarDay): PowerCalendarDay {
  day.datetime = luxon.DateTime.fromJSDate(day.date);
  day.number = parseInt((day.datetime as DateTime).toFormat('d'), 10);
  return day;
}

export function withLocale(locale: string, fn: () => unknown): unknown {
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

export function normalizeCalendarValue(value: {
  date: Date;
}): NormalizeCalendarValue {
  if (value) {
    return {
      date: value.date,
      datetime: value.date ? luxon.DateTime.fromJSDate(value.date) : undefined,
    };
  }
  return { date: undefined, datetime: undefined };
}

const DURATION_UNITS: {
  [key: string]: string;
} = {
  y: 'years',
  M: 'months',
  w: 'weeks',
  d: 'days',
  h: 'hours',
  m: 'minutes',
  s: 'seconds',
};

export function normalizeDuration(value: unknown): number | null | undefined {
  if (value === null) {
    return null;
  }
  if (value instanceof luxon.Duration) {
    return (value as Duration).valueOf();
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
      [units]: parseInt(quantity, 10),
    });
    return duration.valueOf();
  }
}

export function getDefaultLocale(): string {
  return (
    luxon.Settings.defaultLocale ||
    luxon.DateTime.local().resolvedLocaleOptions().locale
  );
}

export function localeStartOfWeek(locale: string): number {
  const now = new Date();
  const day = withLocale(locale, () =>
    formatDate(startOf(now, 'week'), 'dddd'),
  ) as string;
  const idx = (withLocale(locale, getWeekdays) as string[]).indexOf(day);
  return idx >= 0 ? idx : 0;
}

export function startOfWeek(day: Date, startOfWeek: number): Date {
  while (isoWeekday(day) % 7 !== startOfWeek) {
    day = add(day, -1, 'day');
  }
  return day;
}

export function endOfWeek(day: Date, startOfWeek: number): Date {
  const eow = (startOfWeek + 6) % 7;
  while (isoWeekday(day) % 7 !== eow) {
    day = add(day, 1, 'day');
  }
  return day;
}
