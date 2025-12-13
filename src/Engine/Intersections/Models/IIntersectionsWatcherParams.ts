import type { CommonTag } from '@/Engine/Abstract';
import type { IActorWrapper } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IntersectionsTag } from '@/Engine/Intersections/Constants';
import type { IMousePositionWatcher } from '@/Engine/Mouse';

export type IIntersectionsWatcherParams = Readonly<{
  actors: ReadonlyArray<IActorWrapper>;
  camera: Readonly<ICameraWrapper>;
  positionWatcher: Readonly<IMousePositionWatcher>;
  tags?: ReadonlyArray<IntersectionsTag | CommonTag | string>;
}>;
