import type { Observable } from 'rxjs';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { IMousePosition } from '@/Engine/Mouse';

import type { TIntersectionsWatcherProps } from './TIntersectionsWatcherProps';

export type TIntersectionsWatcherParams = Omit<TIntersectionsWatcherProps, 'cameraName' | 'actorNames'> &
  Readonly<{
    camera: TCameraWrapper;
    actors: ReadonlyArray<TActorWrapperAsync>;
    position$: Observable<IMousePosition>;
  }> &
  TWithReadonlyTags;
