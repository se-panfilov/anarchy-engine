import type { Observable } from 'rxjs';

import type { IActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IMousePosition } from '@/Engine/Mouse';

import type { IIntersectionsWatcherProps } from './IIntersectionsWatcherProps';

export type IIntersectionsWatcherParams = Omit<IIntersectionsWatcherProps, 'cameraName' | 'actorNames'> &
  Readonly<{
    camera: ICameraWrapper;
    actors: ReadonlyArray<IActorWrapperAsync>;
    position$: Observable<IMousePosition>;
  }> &
  IWithReadonlyTags;
