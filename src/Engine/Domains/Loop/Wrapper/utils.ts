import type { ICameraWrapper } from '@Engine/Domains/Camera';
import type { IControlsRegistry } from '@/Engine/Domains/Controls';
import type { IRendererWrapper } from '@Engine/Domains/Renderer';
import type { ISceneWrapper } from '@Engine/Domains/Scene';

import { Clock } from 'three';
import type { ILoopUtils, LoopFn } from '../Models';

export function getUtils(entity: LoopFn): ILoopUtils {
  function start(renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, camera: Readonly<ICameraWrapper>, controlsRegistry: IControlsRegistry): void {
    loopWrapper(entity, renderer, scene, camera, controlsRegistry)();
  }

  // TODO (S.Panfilov) implement stop loop

  return { start };
}

function loopWrapper(fn: LoopFn, renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, camera: Readonly<ICameraWrapper>, controlsRegistry: IControlsRegistry): () => void {
  const clock: Clock = new Clock();
  const loop = (): void => {
    // (fpsGraph as any).begin();
    fn(renderer, scene, camera, clock.getElapsedTime(), controlsRegistry);

    // (fpsGraph as any).end();
    requestAnimationFrame(loop);
  };

  return loop;
}
