import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | calendar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Calendar />`);
    await click('[data-date="2016-05-18"]'); // click on the calendar to select a date

    assert
      .dom('[data-test-selector=selected-date]')
      .hasText('2016-05-18T00:00:00.000Z');
    assert.dom('[data-test-selector=selected-time-zone]').hasText('UTC');
  });
});
