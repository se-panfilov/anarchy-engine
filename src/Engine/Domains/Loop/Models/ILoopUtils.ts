import type { ICameraWrapper, IRendererWrapper, ISceneWrapper } from '@Engine/Wrappers';

export type ILoopUtils = Readonly<{
  start: (renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, camera: Readonly<ICameraWrapper>) => void;
}>;
