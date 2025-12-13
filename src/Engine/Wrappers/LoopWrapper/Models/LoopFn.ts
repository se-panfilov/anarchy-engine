import type { RendererWrapper } from '@Engine/Wrappers/RendererWrapper';
import type { SceneWrapper } from '@Engine/Wrappers/SceneWrapper';
import type { CameraWrapper } from '@Engine/Wrappers/CameraWrapper';

export type LoopFn = (
  renderer: ReturnType<typeof RendererWrapper>,
  scene: ReturnType<typeof SceneWrapper>,
  camera: ReturnType<typeof CameraWrapper>
) => void;
