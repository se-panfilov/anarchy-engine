import type { BehaviorSubject } from 'rxjs';

import type { IWithActiveAccessorsService } from '@/Engine/Space';

export type IWithActiveMixinResult<W> = Omit<IWithActiveAccessorsService<W | undefined>, 'active$'> & Readonly<{ active$: BehaviorSubject<W | undefined> }>;
