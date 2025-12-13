import type { BehaviorSubject } from 'rxjs';

export type TDebugAudioRenderer = Readonly<{
  enabled$: BehaviorSubject<boolean>;
}>;
