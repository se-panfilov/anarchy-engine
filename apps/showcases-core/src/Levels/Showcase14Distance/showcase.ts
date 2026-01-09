import type { TActor, TActorRegistry, TMetersPerSecond, TMilliseconds, TReadonlyVector3, TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { KeyCode, meters, metersPerSecond, mpsSpeed, onKeyReleased, spaceService, TransformAgent } from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import GUI from 'lil-gui';
import { Vector3 } from 'three';

import type { TAppSettings } from '@/Models';
import { addGizmo, enableFPSCounter, watchResourceLoading } from '@/Utils';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);
  watchResourceLoading(space);
  if (settings.loopsDebugInfo) enableFPSCounter(space.loops.renderLoop.tick$);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const gui: GUI = new GUI();

  const { keyboardService } = space.services;
  const speed: TMetersPerSecond = metersPerSecond(10);

  const folder: GUI = gui.addFolder('Moving mode');
  const mode = { isKinematic: false };
  folder.add(mode, 'isKinematic').name('Actor is in kinematic mode');

  const { actorService } = space.services;
  const { transformLoop } = space.loops;
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const { getByName } = actorRegistry;
  const { keys$ } = keyboardService;

  const sphere: TActor = getByName('sphere_actor');

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  let isMove: boolean = false;
  let isTimerStarted: boolean = false;

  const sphereCoords: Vector3 = sphere.drive.position$.value.clone();
  sphere.drive.position$.subscribe((position: TReadonlyVector3): TReadonlyVector3 => sphereCoords.copy(position));
  gui.add(sphereCoords, 'x').listen();
  gui.add(sphereCoords, 'y').listen();
  gui.add(sphereCoords, 'z').listen();

  keys$.pipe(onKeyReleased(KeyCode.Enter)).subscribe((): void => {
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

  space.start$.next(true);
}
