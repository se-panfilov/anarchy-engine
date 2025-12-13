import type { ICameraRegistry } from '@/Engine/Domains/Camera';
import type { IControlsRegistry } from '@/Engine/Domains/Controls';
import type { IRendererWrapper } from '@/Engine/Domains/Renderer';
import type { ISceneWrapper } from '@/Engine/Domains/Scene';

import type { ILoopTimes } from './ILoopWrapper';

export type LoopFn = (renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, controlsRegistry: IControlsRegistry, cameraRegistry: ICameraRegistry, time: ILoopTimes) => void;
