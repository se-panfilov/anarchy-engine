import type { CommonTag } from '@/Engine/Abstract';
import type { IntersectionsTag } from '@/Engine/Intersections/Constants';
import type { IMousePositionWatcher } from '@/Engine/Mouse';

export type IIntersectionsWatcherParams = Readonly<{
  mousePosWatcher: Readonly<IMousePositionWatcher>;
  tags?: ReadonlyArray<IntersectionsTag | CommonTag | string>;
}>;
