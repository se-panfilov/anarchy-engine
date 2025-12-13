import type { Observable } from 'rxjs';

import type { ICameraWrapper } from '@/Engine/Camera';
import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IMousePosition } from '@/Engine/Mouse';

import type { IIntersectionsWatcherProps } from './IIntersectionsWatcherProps';

export type IIntersectionsWatcherParams = Omit<IIntersectionsWatcherProps, 'cameraName'> &
  Readonly<{
    camera: ICameraWrapper;
    position$: Observable<IMousePosition>;
  }> &
  IWithReadonlyTags;
