import type { ICameraWrapper } from '@Engine/Domains/Camera';
import type { IRendererWrapper } from '@Engine/Domains/Renderer';
import type { ISceneWrapper } from '@Engine/Domains/Scene';

import type { ILoopUtils, LoopFn } from '../Models';

export function getUtils(entity: LoopFn): ILoopUtils {
  function start(renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, camera: Readonly<ICameraWrapper>): void {
    loopWrapper(entity, renderer, scene, camera)();
  }

  // TODO (S.Panfilov) implement stop loop

  return { start };
}

function loopWrapper(fn: LoopFn, renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, camera: Readonly<ICameraWrapper>): () => void {
  const loop = (): void => {
    // (fpsGraph as any).begin();
    fn(renderer, scene, camera);

    // (fpsGraph as any).end();
    requestAnimationFrame(loop);
  };

  return loop;
}
