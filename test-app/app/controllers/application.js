import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class RedirectController extends Controller {
  @tracked someDate = new Date();
  @tracked selected = null;
  @tracked selectedRange = null;
  @tracked selectedMultiple = null;
}
