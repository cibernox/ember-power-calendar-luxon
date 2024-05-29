import { normalizeCalendarValueInTimeZone } from 'test-app/utils/test-utils';
import { module, test } from 'qunit';

module('Unit | Utility | addon', function () {
  test('normalizeCalendarValue returns a datime in the default time zone', function (assert) {
    // use some time zone that is unlikely to be the system time zone
    const datetime = normalizeCalendarValueInTimeZone(
      'Niue/Alofi',
      new Date('2020-01-02T00:00:00Z'),
    );

    assert.equal(datetime.zoneName, 'Niue/Alofi');
    assert.equal(datetime.toISO(), '2020-01-01T13:00:00.000-11:00');
  });
});
