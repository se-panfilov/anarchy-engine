import type { Subscription } from 'rxjs';

import type { TDestroyable } from './TDestroyable';

export type TDisposable = TDestroyable | Subscription;
