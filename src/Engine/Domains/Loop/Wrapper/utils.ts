import { Clock } from 'three';

import type { ICameraRegistry } from '@/Engine/Domains/Camera';
import type { IControlsRegistry } from '@/Engine/Domains/Controls';
import type { ILoopUtils, LoopFn } from '@/Engine/Domains/Loop/Models';
import type { IRendererWrapper } from '@/Engine/Domains/Renderer';
import type { ISceneWrapper } from '@/Engine/Domains/Scene';

export function getUtils(entity: LoopFn): ILoopUtils {
  function start(renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, controlsRegistry: IControlsRegistry, cameraRegistry: ICameraRegistry): void {
    loopWrapper(entity, renderer, scene, controlsRegistry, cameraRegistry)();
  }

  // TODO (S.Panfilov) implement stop loop

  return { start };
}

function loopWrapper(fn: LoopFn, renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, controlsRegistry: IControlsRegistry, cameraRegistry: ICameraRegistry): () => void {
  const clock: Clock = new Clock();
  let lastElapsedTime: number = 0;
  const loop = (): void => {
    // (fpsGraph as any).begin();
    const elapsedTime: number = clock.getElapsedTime();
    const delta: number = elapsedTime - lastElapsedTime;
    lastElapsedTime = elapsedTime;
    fn(renderer, scene, delta, controlsRegistry, cameraRegistry);

    // (fpsGraph as any).end();
    requestAnimationFrame(loop);
  };

  return loop;
}
