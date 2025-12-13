import type { Observable } from 'rxjs';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { IMousePosition } from '@/Engine/Mouse';

import type { IIntersectionsWatcherProps } from './IIntersectionsWatcherProps';

export type IIntersectionsWatcherParams = Omit<IIntersectionsWatcherProps, 'cameraName' | 'actorNames'> &
  Readonly<{
    camera: TCameraWrapper;
    actors: ReadonlyArray<TActorWrapperAsync>;
    position$: Observable<IMousePosition>;
  }> &
  TWithReadonlyTags;
