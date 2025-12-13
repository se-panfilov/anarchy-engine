import type { IActorWrapper } from '@Engine/Domains/Actor';
import type { ICameraWrapper } from '@Engine/Domains/Camera';
import type { IMousePositionWatcher } from '@Engine/Watchers';

export type IIntersectionsParams = Readonly<{
  actors: ReadonlyArray<IActorWrapper>;
  camera: Readonly<ICameraWrapper>;
  positionWatcher: Readonly<IMousePositionWatcher>;
  tags?: ReadonlyArray<string>;
}>;
