import type { Subject } from 'rxjs';

export type TWithReactiveRegistry<T> = {
  added$: Subject<T>;
  removed$: Subject<T>;
  replaced$: Subject<T>;
};
