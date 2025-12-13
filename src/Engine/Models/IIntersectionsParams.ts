import type { IActorWrapper, ICameraWrapper } from '@/Engine/Wrappers';
import type { IMousePositionWatcher } from '@/Engine';

export type IIntersectionsParams = Readonly<{
  actors: ReadonlyArray<IActorWrapper>;
  camera: Readonly<ICameraWrapper>;
  positionWatcher: Readonly<IMousePositionWatcher>;
  tags?: ReadonlyArray<string>;
}>;
