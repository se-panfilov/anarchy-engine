import type { IMousePositionWatcher } from '@/Engine';
import type { IActorWrapper, ICameraWrapper } from '@/Engine/Wrappers';

export type IIntersectionsParams = Readonly<{
  actors: ReadonlyArray<IActorWrapper>;
  camera: Readonly<ICameraWrapper>;
  positionWatcher: Readonly<IMousePositionWatcher>;
  tags?: ReadonlyArray<string>;
}>;
