import type { ICameraWrapper, IRendererWrapper, ISceneWrapper } from '@Engine/Wrappers';

export type LoopFn = (renderer: IRendererWrapper, scene: ISceneWrapper, camera: ICameraWrapper) => void;
