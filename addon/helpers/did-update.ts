import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';

import {
  PositionalParameters,
  NamedParameters,
  HelperCallback
} from 'ember-render-helpers/types';

/**
 * This helper is activated only on _updates_ to it's arguments (both positional
 * and named). It does not run during or after initial render, or before it is
 * un-rendered (removed from the DOM).
 */
export default class DidUpdateHelper extends Helper {
  didRun = false;

  compute(positional: PositionalParameters, named: NamedParameters): void {
    const fn = positional[0] as HelperCallback;
    assert(
      `\`{{did-insert fn}}\` expects a function as the first parameter. You provided: ${fn}`,
      typeof fn === 'function'
    );
    if (!this.didRun) {
      this.didRun = true;
      return;
    }
    fn(positional.slice(1), named);
  }
}
