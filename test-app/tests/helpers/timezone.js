import { Settings } from 'luxon';

const defaultZone = Settings.defaultZone.name;

export function setTimezone(zone) {
  Settings.defaultZone = zone;
}

export function resetTimezone() {
  Settings.defaultZone = defaultZone;
}
