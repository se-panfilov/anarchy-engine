import { Clock } from 'three';

import type { ICameraRegistry } from '@/Engine/Domains/Camera';
import type { IControlsRegistry } from '@/Engine/Domains/Controls';
import type { ILoopUtils, LoopFn } from '@/Engine/Domains/Loop/Models';
import type { IRendererWrapper } from '@/Engine/Domains/Renderer';
import type { ISceneWrapper } from '@/Engine/Domains/Scene';

let isRan: boolean = false;

export function getUtils(entity: LoopFn): ILoopUtils {
  function start(renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, controlsRegistry: IControlsRegistry, cameraRegistry: ICameraRegistry): void {
    isRan = true;
    requestAnimationFrame(loopWrapper(entity, renderer, scene, controlsRegistry, cameraRegistry));
  }

  function stop(): void {
    isRan = false;
  }

  return { start, stop };
}

function loopWrapper(fn: LoopFn, renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, controlsRegistry: IControlsRegistry, cameraRegistry: ICameraRegistry): (time: number) => void {
  const clock: Clock = new Clock();
  let lastElapsedTime: number = 0;
  const loop = (frameTime: number): void => {
    // (fpsGraph as any).begin();
    if (!isRan) return;
    const elapsedTime: number = clock.getElapsedTime();
    // console.log(time, elapsedTime * 1000);
    const delta: number = elapsedTime - lastElapsedTime;
    lastElapsedTime = elapsedTime;
    fn(renderer, scene, controlsRegistry, cameraRegistry, { delta, frameTime, elapsedTime });

    // (fpsGraph as any).end();
    requestAnimationFrame(loop);
  };

  return loop;
}
