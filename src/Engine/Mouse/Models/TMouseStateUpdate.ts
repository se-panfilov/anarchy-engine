import type { Subject } from 'rxjs';

export type TMouseStateUpdate = Readonly<{
  state$: Subject<boolean>;
  value: boolean;
}>;
