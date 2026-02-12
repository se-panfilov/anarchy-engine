import type { TAbstractWrapper } from '@Anarchy/Engine/Abstract';
import type { TLoadingEvent } from '@Anarchy/Engine/LoadingManager';
import type { TDestroyable } from '@Anarchy/Engine/Mixins';
import type { BehaviorSubject } from 'rxjs';
import type { LoadingManager } from 'three';

//No need for serialization, so we use TAbstractWrapper instead of TWrapper
export type TLoadingManagerWrapper = TAbstractWrapper<LoadingManager> &
  Readonly<{
    progress$: BehaviorSubject<TLoadingEvent>;
    ready$: BehaviorSubject<boolean>;
    waitFontsLoading: (label?: string) => Promise<void>;
    waitLoading: <T>(label: string, loadingTask: () => Promise<T>) => Promise<T>;
  }> &
  TDestroyable;
