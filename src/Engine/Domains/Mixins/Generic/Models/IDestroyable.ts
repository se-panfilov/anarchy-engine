import type { BehaviorSubject } from 'rxjs';

export type IDestroyable = Readonly<{
  destroyed$: BehaviorSubject<boolean>;
  destroy: () => void;
}>;
