import type { Subject } from 'rxjs';

export type IWithReactiveRegistry<T> = {
  added$: Subject<T>;
  replaced$: Subject<T>;
  removed$: Subject<T>;
};
