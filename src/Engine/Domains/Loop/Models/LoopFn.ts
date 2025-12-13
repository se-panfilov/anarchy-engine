import type { ICameraWrapper } from '@Engine/Domains/Camera/Models';
import type { IRendererWrapper } from '@Engine/Domains/Renderer/Models';
import type { ISceneWrapper } from '@Engine/Domains/Scene/Models';

export type LoopFn = (renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, camera: Readonly<ICameraWrapper>) => void;
