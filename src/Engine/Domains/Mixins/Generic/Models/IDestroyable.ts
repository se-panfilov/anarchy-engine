import type { Observable } from 'rxjs';

export type IDestroyable = Readonly<{
  destroyed$: Observable<boolean>;
  isDestroyed: () => boolean;
  destroy: () => void;
}>;
