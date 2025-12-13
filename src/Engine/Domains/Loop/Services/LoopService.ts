import { Subject } from 'rxjs';
import { Clock } from 'three';

import type { ICameraWrapper } from '@/Engine/Domains/Camera';
import { CameraTag } from '@/Engine/Domains/Camera';
import type { IOrbitControlsWrapper } from '@/Engine/Domains/Controls';
import type { ILoopService, ILoopServiceParams, ILoopTimes } from '@/Engine/Domains/Loop/Models';
import { isDefined } from '@/Engine/Utils';

export function LoopService(params: ILoopServiceParams): ILoopService {
  const tick$: Subject<ILoopTimes> = new Subject<ILoopTimes>();

  let isLooping: boolean = false;

  const loopFn = getLoopFn(params, tick$, isLooping);

  function start(): void {
    isLooping = true;
    requestAnimationFrame(loopFn);
  }

  function stop(): void {
    isLooping = false;
  }

  return {
    start,
    stop,
    tick$: tick$.asObservable(),
    getIsLooping: (): boolean => isLooping
  };
}

function getLoopFn(params: ILoopServiceParams, tick$: Subject<ILoopTimes>, isLooping: boolean): (time: number) => void {
  const clock: Clock = new Clock();
  let lastElapsedTime: number = 0;

  function loopFn(frameTime: number): void {
    // (fpsGraph as any).begin();
    if (!isLooping) return;
    const elapsedTime: number = clock.getElapsedTime();
    const delta: number = elapsedTime - lastElapsedTime;
    lastElapsedTime = elapsedTime;
    tick$.next({ delta, frameTime, elapsedTime });

    // TODO (S.Panfilov) could be extracted with tick$
    // TODO (S.Panfilov) also perhaps make a controls service instead of a factory?
    //just for control's damping
    params.controlsRegistry.getAll().forEach((controls: IOrbitControlsWrapper): void => {
      if (controls.entity.enableDamping) controls.entity.update(delta);
    });

    const activeCamera: ICameraWrapper | undefined = params.cameraRegistry.getUniqByTag(CameraTag.Active);
    if (isDefined(activeCamera)) params.renderer.entity.render(params.scene.entity, activeCamera.entity);

    // (fpsGraph as any).end();
    requestAnimationFrame(loopFn);
  }

  return loopFn;
}
