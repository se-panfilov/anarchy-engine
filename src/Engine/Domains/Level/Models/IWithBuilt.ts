import type { Subject } from 'rxjs';

export type IWithBuilt = {
  build: () => void;
  isBuilt: () => boolean;
  built$: Subject<void>;
};
