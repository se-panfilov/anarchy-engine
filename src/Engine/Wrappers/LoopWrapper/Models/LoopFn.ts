import type { CameraWrapper, RendererWrapper, SceneWrapper } from '@Engine/Wrappers';

export type LoopFn = (
  renderer: ReturnType<typeof RendererWrapper>,
  scene: ReturnType<typeof SceneWrapper>,
  camera: ReturnType<typeof CameraWrapper>
) => void;
