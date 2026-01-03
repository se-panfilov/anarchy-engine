import type { TWrapper } from '@Anarchy/Engine/Abstract';
import type { TDestroyable } from '@Anarchy/Engine/Mixins';

import type { TLoadingManager } from './TLoadingManager';

export type TLoadingManagerWrapper = TWrapper<TLoadingManager> & TDestroyable;
