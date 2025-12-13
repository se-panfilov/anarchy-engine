import type { CameraWrapper, RendererWrapper, SceneWrapper } from '@Engine/Wrappers';
import type { LoopFn } from './Models';

export interface LoopUtils {
  readonly start: (
    renderer: ReturnType<typeof RendererWrapper>,
    scene: ReturnType<typeof SceneWrapper>,
    camera: ReturnType<typeof CameraWrapper>
  ) => void;
}

export function getUtils(entity: LoopFn): LoopUtils {
  function start(
    renderer: ReturnType<typeof RendererWrapper>,
    scene: ReturnType<typeof SceneWrapper>,
    camera: ReturnType<typeof CameraWrapper>
  ): void {
    loopWrapper(entity, renderer, scene, camera)();
  }

  // TODO (S.Panfilov) implement stop loop

  return { start };
}

function loopWrapper(
  fn: LoopFn,
  renderer: ReturnType<typeof RendererWrapper>,
  scene: ReturnType<typeof SceneWrapper>,
  camera: ReturnType<typeof CameraWrapper>
): () => void {
  const loop = (): void => {
    // (fpsGraph as any).begin();
    fn(renderer, scene, camera);

    // (fpsGraph as any).end();
    requestAnimationFrame(loop);
  };

  return loop;
}
