import type { Subject } from 'rxjs';
import type { IReactiveWrapper } from '@Engine/Models';
import type { AbstractConfig } from '@Engine/Launcher/Models';

export interface IFactory<T extends IReactiveWrapper<ENT>, ENT, PRMS, C extends AbstractConfig> {
  readonly id: string;
  readonly type: string;
  readonly latest$: Subject<T>;
  readonly create$: Subject<PRMS>;
  readonly createFromConfig$: Subject<C>;
  readonly destroy$: Subject<void>;
}
