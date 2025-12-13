import type { Observable } from 'rxjs';

import type { TActor } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TMousePosition } from '@/Engine/Mouse';

import type { TIntersectionsWatcherProps } from './TIntersectionsWatcherProps';

export type TIntersectionsWatcherParams = Omit<TIntersectionsWatcherProps, 'cameraName' | 'actorNames'> &
  Readonly<{
    camera: TCameraWrapper;
    actors: ReadonlyArray<TActor>;
    position$: Observable<TMousePosition>;
    delay?: number;
  }> &
  TWithReadonlyTags;
