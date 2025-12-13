import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';
import type { RendererWrapper } from '@Engine/Wrappers/RendererWrapper';
import { SceneWrapper } from '@Engine/Wrappers/SceneWrapper';
import { CameraWrapper } from '@Engine/Wrappers/CameraWrapper';

type LoopFn = (renderer: RendererWrapper, scene: SceneWrapper, camera: CameraWrapper) => void;

let requestAnimationFrameId: number;

const loopWrapper = (
  fn: LoopFn,
  renderer: RendererWrapper,
  scene: SceneWrapper,
  camera: CameraWrapper
): (() => void) => {
  const loop = (): void => {
    // (fpsGraph as any).begin();
    fn(renderer, scene, camera);

    // (fpsGraph as any).end();
    requestAnimationFrameId = requestAnimationFrame(loop);
  };

  return loop;
};

export class LoopWrapper extends AbstractWrapper<LoopFn> {
  public entity: LoopFn;

  constructor() {
    super();

    this.entity = (renderer: RendererWrapper, scene: SceneWrapper, camera: CameraWrapper): void => {
      renderer.entity.render(scene.entity, camera.entity);
    };
  }

  // TODO (S.Panfilov) DI renderer?
  // TODO (S.Panfilov) DI scene?
  // TODO (S.Panfilov) DI camera?
  public start(renderer: RendererWrapper, scene: SceneWrapper, camera: CameraWrapper): void {
    loopWrapper(this.entity, renderer, scene, camera)();
  }

  public stop(): void {
    cancelAnimationFrame(requestAnimationFrameId);
  }
}
