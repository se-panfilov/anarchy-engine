import type { Subject } from 'rxjs';
import type { ReactiveWrapper } from '@Engine/Models';
import type { AbstractConfig } from '@Engine/Launcher/Models';

export interface Factory<T extends ReactiveWrapper<ENT>, ENT, PRMS> {
  readonly id: string;
  readonly type: string;
  readonly latest$: Subject<T>;
  readonly create$: Subject<PRMS>;
  readonly createFromConfig$: Subject<AbstractConfig>;
  readonly destroyed$: Subject<void>;
}
