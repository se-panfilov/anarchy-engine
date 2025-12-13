import type { ICameraWrapper, IRendererWrapper, ISceneWrapper } from '@Engine/Wrappers';

export type LoopFn = (renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, camera: Readonly<ICameraWrapper>) => void;
