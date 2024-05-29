import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { Settings } from 'luxon';

export default class extends Component {
  @tracked selected = new Date('2016-05-17');
  @tracked selectedDatetime;

  constructor() {
    super(...arguments);
    Settings.defaultZone = 'UTC';
  }

  @action
  onSelect(selected) {
    this.selected = selected.date;
    this.selectedDatetime = selected.datetime;
  }

  get selectedDateIso() {
    return this.selectedDatetime?.toISO();
  }

  get selectedDateTimezone() {
    console.log(this.selectedDatetime);
    return this.selectedDatetime?.zoneName;
  }
}
