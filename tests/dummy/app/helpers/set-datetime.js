import { helper } from '@ember/component/helper';
import { set } from '@ember/object';

export default helper(function setDatetime([that, field, value]) {
  if (that && field && value) {
    set(that, field, value.datetime);
  }
});
