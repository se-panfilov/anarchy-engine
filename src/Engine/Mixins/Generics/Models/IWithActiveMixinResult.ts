import type { BehaviorSubject } from 'rxjs';

import type { TWithActiveAccessorsService } from '@/Engine/Space';

export type IWithActiveMixinResult<W> = Omit<TWithActiveAccessorsService<W | undefined>, 'active$'> & Readonly<{ active$: BehaviorSubject<W | undefined> }>;
