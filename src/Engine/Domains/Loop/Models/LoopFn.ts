import type { ICameraWrapper } from '@Engine/Domains/Camera';
import type { IControlsRegistry } from '@/Engine/Domains/Controls';
import type { IRendererWrapper } from '@Engine/Domains/Renderer';
import type { ISceneWrapper } from '@Engine/Domains/Scene';

export type LoopFn = (renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, camera: Readonly<ICameraWrapper>, delta: number, controlsRegistry: IControlsRegistry) => void;
