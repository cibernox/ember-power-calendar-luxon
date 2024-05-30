import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'test-app/config/environment';
import { registerDateLibrary } from 'ember-power-calendar';
import { Settings } from 'luxon';
import DateUtils from 'ember-power-calendar-luxon';

Settings.defaultZone = 'UTC';

registerDateLibrary(DateUtils);

console.log(DateUtils.normalizeCalendarDay({
  id: 1,
  number: 1,
  date: new Date(),
  isDisabled: false,
  isFocused: false,
  isCurrentMonth: false,
  isToday: false,
  isSelected: false,
}));

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
