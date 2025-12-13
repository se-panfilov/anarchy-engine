import type { TCameraRegistry } from '@/Engine/Camera';
import type { TControlsRegistry } from '@/Engine/Controls';
import type { TRendererWrapper } from '@/Engine/Renderer';
import type { TSceneWrapper } from '@/Engine/Scene';

export type TLoopUtils = Readonly<{
  start: (renderer: Readonly<TRendererWrapper>, scene: Readonly<TSceneWrapper>, controlsRegistry: TControlsRegistry, cameraRegistry: TCameraRegistry) => void;
  stop: () => void;
}>;
