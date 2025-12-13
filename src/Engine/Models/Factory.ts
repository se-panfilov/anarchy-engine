import type { Subject } from 'rxjs';
import type { ReactiveWrapper } from '@Engine/Models';
import type { AbstractConfig } from '@Engine/Launcher/Models';

export interface Factory<T extends ReactiveWrapper<unknown>, PARAMS extends Record<string, any>> {
  readonly id: string;
  readonly factoryType: string;
  readonly latest$: Subject<T>;
  readonly create$: Subject<PARAMS>;
  readonly createFromConfig$: Subject<AbstractConfig>;
  readonly destroyed$: Subject<void>;
}
