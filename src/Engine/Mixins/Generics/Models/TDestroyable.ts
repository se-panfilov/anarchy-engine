import type { Observable } from 'rxjs';

export type TDestroyable = Readonly<{
  destroyed$: Observable<void>;
  isDestroyed: () => boolean;
  destroy: () => void;
}>;
