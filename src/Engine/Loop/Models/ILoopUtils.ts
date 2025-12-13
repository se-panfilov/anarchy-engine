import type { ICameraRegistry } from '@/Engine/Camera';
import type { IControlsRegistry } from '@/Engine/Controls';
import type { IRendererWrapper } from '@/Engine/Renderer';
import type { ISceneWrapper } from '@/Engine/Scene';

export type ILoopUtils = Readonly<{
  start: (renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, controlsRegistry: IControlsRegistry, cameraRegistry: ICameraRegistry) => void;
  stop: () => void;
}>;
