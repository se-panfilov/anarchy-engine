import type { TAbstractWrapper } from '@Anarchy/Engine/Abstract';
import type { TDestroyable } from '@Anarchy/Engine/Mixins';
import type { LoadingManager } from 'three';

//No need for serialization, so we use TAbstractWrapper instead of TWrapper
export type TLoadingManagerWrapper = TAbstractWrapper<LoadingManager> & TDestroyable;
