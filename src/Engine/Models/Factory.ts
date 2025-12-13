import type { Subject } from 'rxjs';
import type { ReactiveWrapper } from '@Engine/Models';
import type { AbstractConfig } from '@Engine/Launcher/Models';

export interface Factory<T extends ReactiveWrapper<R>, R, CreateParams> {
  readonly id: string;
  readonly type: string;
  readonly latest$: Subject<T>;
  readonly create$: Subject<CreateParams>;
  readonly createFromConfig$: Subject<AbstractConfig>;
  readonly destroyed$: Subject<void>;
}
