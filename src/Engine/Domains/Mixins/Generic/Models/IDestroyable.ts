import type { Observable } from 'rxjs';

export type IDestroyable = Readonly<{
  destroyed$: Observable<void>;
  isDestroyed: () => boolean;
  destroy: () => void;
}>;
