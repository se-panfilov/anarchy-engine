import type { IRendererWrapper } from '@Engine/Domains/Renderer/Models';
import type { ISceneWrapper } from '@Engine/Domains/Scene/Models';
import type { ICameraWrapper } from '@Engine/Domains/Camera/Models';

export type ILoopUtils = Readonly<{
  start: (renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, camera: Readonly<ICameraWrapper>) => void;
}>;
