import type { ICameraWrapper, IRendererWrapper, ISceneWrapper } from '@Engine/Wrappers';

export interface ILoopUtils {
  readonly start: (renderer: IRendererWrapper, scene: ISceneWrapper, camera: ICameraWrapper) => void;
}
