import { helper } from '@ember/component/helper';

export default helper(function setDatetime([that, field, value]) {
  if (that && field && value) {
    that[field] = value.datetime;
  }
});
