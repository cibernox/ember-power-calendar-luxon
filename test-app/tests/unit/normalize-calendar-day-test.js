import { module, test } from 'qunit';
import { normalizeCalendarDay } from 'ember-power-calendar/test-support/helpers';
import { Settings } from 'luxon';

const defaultZone = Settings.defaultZone.name;

module('Unit | Utility | normalize-calendar-day', function (hooks) {
  hooks.beforeEach(function () {
    Settings.defaultZone = 'Pacific/Niue';
  });

  hooks.afterEach(function () {
    Settings.defaultZone = defaultZone;
  });

  test('normalizeCalendarDay', function (assert) {
    let date = new Date('2020-01-02T00:00:00Z');
    
    const calendarDay = normalizeCalendarDay({
      id: 1,
      number: 1,
      date: date,
      isDisabled: false,
      isFocused: false,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
    });

    assert.equal(calendarDay.datetime.zoneName, 'Pacific/Niue');
    assert.equal(calendarDay.datetime.toISO(), '2020-01-01T13:00:00.000-11:00');
  });
});
