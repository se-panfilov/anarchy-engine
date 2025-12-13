import type { ICameraWrapper } from '@Engine/Domains/Camera';
import type { IRendererWrapper } from '@Engine/Domains/Renderer';
import type { ISceneWrapper } from '@Engine/Domains/Scene';

export type ILoopUtils = Readonly<{
  start: (renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, camera: Readonly<ICameraWrapper>) => void;
}>;
