import { Clock } from 'three';

import type { ICameraWrapper } from '@/Engine/Domains/Camera';
import type { IControlsRegistry } from '@/Engine/Domains/Controls';
import type { ILoopUtils, LoopFn } from '@/Engine/Domains/Loop/Models';
import type { IRendererWrapper } from '@/Engine/Domains/Renderer';
import type { ISceneWrapper } from '@/Engine/Domains/Scene';

export function getUtils(entity: LoopFn): ILoopUtils {
  function start(renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, controlsRegistry: IControlsRegistry, camera?: Readonly<ICameraWrapper>): void {
    loopWrapper(entity, renderer, scene, controlsRegistry, camera)();
  }

  // TODO (S.Panfilov) implement stop loop

  return { start };
}

function loopWrapper(fn: LoopFn, renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, controlsRegistry: IControlsRegistry, camera?: Readonly<ICameraWrapper>): () => void {
  const clock: Clock = new Clock();
  const loop = (): void => {
    // (fpsGraph as any).begin();
    fn(renderer, scene, clock.getElapsedTime(), controlsRegistry, camera);

    // (fpsGraph as any).end();
    requestAnimationFrame(loop);
  };

  return loop;
}
