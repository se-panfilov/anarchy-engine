import type { TCameraRegistry } from '@/Engine/Camera';
import type { TControlsRegistry } from '@/Engine/Controls';
import type { IRendererWrapper } from '@/Engine/Renderer';
import type { TSceneWrapper } from '@/Engine/Scene';

export type ILoopUtils = Readonly<{
  start: (renderer: Readonly<IRendererWrapper>, scene: Readonly<TSceneWrapper>, controlsRegistry: TControlsRegistry, cameraRegistry: TCameraRegistry) => void;
  stop: () => void;
}>;
