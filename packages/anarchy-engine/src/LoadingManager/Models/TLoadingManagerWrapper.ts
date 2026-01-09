import type { TAbstractWrapper } from '@Anarchy/Engine/Abstract';
import type { TLoadingEvent } from '@Anarchy/Engine/LoadingManager';
import type { TDestroyable } from '@Anarchy/Engine/Mixins';
import type { BehaviorSubject } from 'rxjs';
import type { LoadingManager } from 'three';

//No need for serialization, so we use TAbstractWrapper instead of TWrapper
export type TLoadingManagerWrapper = TAbstractWrapper<LoadingManager> &
  Readonly<{
    waitLoading: <T>(label: string, loadingTask: () => Promise<T>) => Promise<T>;
    waitFontsLoading: (label?: string) => Promise<void>;
    value$: BehaviorSubject<TLoadingEvent>;
  }> &
  TDestroyable;
