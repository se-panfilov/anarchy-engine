import type { BehaviorSubject } from 'rxjs';

import type { TWithActiveAccessorsService } from '@/Mixins';

export type TWithActiveMixinResult<W> = Omit<TWithActiveAccessorsService<W>, 'active$'> & Readonly<{ active$: BehaviorSubject<W | undefined> }>;
