import type { ICameraRegistry } from '@/Engine/Domains/Camera';
import type { IControlsRegistry } from '@/Engine/Domains/Controls';
import type { IRendererWrapper } from '@/Engine/Domains/Renderer';
import type { ISceneWrapper } from '@/Engine/Domains/Scene';

export type ILoopServiceParams = {
  renderer: Readonly<IRendererWrapper>;
  scene: Readonly<ISceneWrapper>;
  controlsRegistry: IControlsRegistry;
  cameraRegistry: ICameraRegistry;
};
