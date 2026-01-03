import type { TAbstractWrapper } from '@Anarchy/Engine/Abstract';
import type { TDestroyable } from '@Anarchy/Engine/Mixins';

import type { TLoadingManager } from './TLoadingManager';

//No need for serialization, so we use TAbstractWrapper instead of TWrapper
export type TLoadingManagerWrapper = TAbstractWrapper<TLoadingManager> & TDestroyable;
