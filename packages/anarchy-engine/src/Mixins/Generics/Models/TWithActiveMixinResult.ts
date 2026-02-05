import type { TWithActiveAccessorsService } from '@hellpig/anarchy-engine/Mixins/Services/Models';
import type { BehaviorSubject } from 'rxjs';

export type TWithActiveMixinResult<W> = Omit<TWithActiveAccessorsService<W>, 'active$'> & Readonly<{ active$: BehaviorSubject<W | undefined> }>;
