import type { ICameraWrapper, IRendererWrapper, ISceneWrapper } from '@Engine/Wrappers';

export type ILoopUtils = Readonly<{
  start: (renderer: IRendererWrapper, scene: ISceneWrapper, camera: ICameraWrapper) => void;
}>;
