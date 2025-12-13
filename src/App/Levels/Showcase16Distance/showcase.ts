import GUI from 'lil-gui';
import { Vector3 } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo } from '@/App/Levels/Utils';
import type { TActor, TActorRegistry, TAppCanvas, TCameraRegistry, TEngine, TMetersPerSecond, TMilliseconds, TReadonlyVector3, TSpace, TSpaceConfig } from '@/Engine';
import { ambientContext, Engine, isNotDefined, KeysExtra, meters, metersPerSecond, mpsSpeed, spaceService, TransformAgent } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const gui: GUI = new GUI();
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const speed: TMetersPerSecond = metersPerSecond(10);

  const folder: GUI = gui.addFolder('Moving mode');
  const mode = { isKinematic: false };
  folder.add(mode, 'isKinematic').name('Actor is in kinematic mode');

  const { actorService, cameraService } = space.services;
  const { transformLoop } = space.loops;
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const cameraRegistry: TCameraRegistry = cameraService.getRegistry();
  if (isNotDefined(actorRegistry)) throw new Error('Actor registry is not defined');
  if (isNotDefined(cameraRegistry)) throw new Error('Camera registry is not defined');
  const { findByName } = actorRegistry;
  const { onKey } = keyboardService;

  function init(): void {
    const sphere: TActor | undefined = findByName('sphere_actor');
    if (isNotDefined(sphere)) throw new Error('Actor "sphere_actor" is not defined');

    addGizmo(space.services, ambientContext.screenSizeWatcher, space.loops, { placement: 'bottom-left' });

    let isMove: boolean = false;
    let isTimerStarted: boolean = false;

    const sphereCoords: Vector3 = sphere.drive.position$.value.clone();
    sphere.drive.position$.subscribe((position: TReadonlyVector3): TReadonlyVector3 => sphereCoords.copy(position));
    gui.add(sphereCoords, 'x').listen();
    gui.add(sphereCoords, 'y').listen();
    gui.add(sphereCoords, 'z').listen();

    onKey(KeysExtra.Enter).released$.subscribe((): void => {
      if (!mode.isKinematic) {
        if (sphere.drive.getActiveAgent().type !== TransformAgent.Default) sphere.drive.agent$.next(TransformAgent.Default);
        if (!isMove) isMove = true;
      } else {
        if (sphere.drive.getActiveAgent().type !== TransformAgent.Kinematic) sphere.drive.agent$.next(TransformAgent.Kinematic);
        const position: Vector3 = sphere.drive.position$.value.clone().add(new Vector3(0, 0, meters(-100)));
        sphere.drive.kinematic.moveTo(position, speed);
      }
    });

    sphere.drive.position$.subscribe((position: TReadonlyVector3): void => {
      if (position.z <= -50) {
        console.timeEnd('move');
        isMove = false;
        sphere.drive.default.setZ(50);
        return;
      }
    });

    //Move by click once
    transformLoop.tick$.subscribe((delta: TMilliseconds): void => {
      if (isMove && !isTimerStarted) {
        isTimerStarted = true;
        console.time('move');
      }

      if (isMove) {
        sphere.drive.default.setZ(sphere.drive.position$.value.z - mpsSpeed(speed, delta));
      }
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
