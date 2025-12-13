import type { Subject } from 'rxjs';

export type TDestroyable = Readonly<{
  destroy$: Subject<void>;
}>;
