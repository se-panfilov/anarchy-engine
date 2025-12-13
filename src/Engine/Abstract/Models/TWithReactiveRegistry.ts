import type { Subject } from 'rxjs';

export type TWithReactiveRegistry<T> = {
  added$: Subject<T>;
  replaced$: Subject<T>;
  removed$: Subject<T>;
};
