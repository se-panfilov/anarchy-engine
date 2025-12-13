import type { IActorWrapper } from '@Engine/Domains/Actor';
import type { ICameraWrapper } from '@Engine/Domains/Camera';
import type { IntersectionsTag } from '@Engine/Domains/Intersections/Constants';
import type { IMousePositionWatcher } from '@Engine/Domains/Mouse';

import type { CommonTags } from '@/Engine/Domains/Abstract';

export type IIntersectionsWatcherParams = Readonly<{
  actors: ReadonlyArray<IActorWrapper>;
  camera: Readonly<ICameraWrapper>;
  positionWatcher: Readonly<IMousePositionWatcher>;
  tags?: ReadonlyArray<IntersectionsTag | CommonTags | string>;
}>;
