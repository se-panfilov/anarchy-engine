import type { Subject } from 'rxjs';

export type TWithBuilt = Readonly<{
  build: () => void;
  isBuilt: () => boolean;
  built$: Subject<void>;
}>;
