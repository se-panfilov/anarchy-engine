import type { Observable } from 'rxjs';

import type { CommonTag } from '@/Engine/Abstract';
import type { IntersectionsTag } from '@/Engine/Intersections/Constants';
import type { IMousePosition } from '@/Engine/Mouse';

export type IIntersectionsWatcherParams = Readonly<{
  position$: Observable<IMousePosition>;
  tags?: ReadonlyArray<IntersectionsTag | CommonTag | string>;
}>;
