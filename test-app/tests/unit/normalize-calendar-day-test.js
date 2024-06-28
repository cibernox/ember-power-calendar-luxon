import { module, test } from 'qunit';
import { normalizeCalendarDay } from 'ember-power-calendar/test-support/helpers';
import { resetTimezone, setTimezone } from '../helpers/timezone';

module('Unit | Utility | normalize-calendar-day', function (hooks) {
  hooks.afterEach(function () {
    resetTimezone();
  });

  test('normalizeCalendarDay', function (assert) {
    setTimezone('Pacific/Niue');

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

    assert.strictEqual(calendarDay.datetime.zoneName, 'Pacific/Niue');
    assert.strictEqual(calendarDay.datetime.toISO(), '2020-01-01T13:00:00.000-11:00');
  });
});
