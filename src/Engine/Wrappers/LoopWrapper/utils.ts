import type { ICameraWrapper, IRendererWrapper, ISceneWrapper } from '@Engine/Wrappers';
import type { ILoopUtils, LoopFn } from './Models';

export function getUtils(entity: LoopFn): ILoopUtils {
  function start(renderer: IRendererWrapper, scene: ISceneWrapper, camera: ICameraWrapper): void {
    loopWrapper(entity, renderer, scene, camera)();
  }

  // TODO (S.Panfilov) implement stop loop

  return { start };
}

function loopWrapper(fn: LoopFn, renderer: IRendererWrapper, scene: ISceneWrapper, camera: ICameraWrapper): () => void {
  const loop = (): void => {
    // (fpsGraph as any).begin();
    fn(renderer, scene, camera);

    // (fpsGraph as any).end();
    requestAnimationFrame(loop);
  };

  return loop;
}
