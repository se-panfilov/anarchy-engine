import type { Subject } from 'rxjs';

export type IWithBuilt = Readonly<{
  build: () => void;
  isBuilt: () => boolean;
  built$: Subject<void>;
}>;
