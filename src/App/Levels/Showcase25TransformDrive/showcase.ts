import GUI from 'lil-gui';
import { map, withLatestFrom } from 'rxjs';
import { Vector3 } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type {
  TActor,
  TAppCanvas,
  TCameraWrapper,
  TEngine,
  TIntersectionEvent,
  TIntersectionsWatcher,
  TModel3d,
  TModel3dRegistry,
  TMouseWatcherEvent,
  TOrbitControlsWrapper,
  TPointLightWrapper,
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TSpatialGridWrapper
} from '@/Engine';
import { Engine, getMouseAzimuthAndElevation, isNotDefined, KeysExtra, spaceService, TransformAgent } from '@/Engine';
import { meters } from '@/Engine/Measurements/Utils';
import { getHumanReadableMemorySize } from '@/Engine/Utils/FileUtils';

import spaceConfig from './showcase.json';
import {
  addActorFolderGui,
  addSpatialGuiFolder,
  attachConnectorToSubj,
  changeActorActiveAgent,
  connectCameraToActor,
  connectObjToActor,
  createActor,
  createReactiveLineFromActor,
  createRepeaterActor,
  startIntersections
} from './Utils';

//This showcase should demonstrate the ways we can move the actor.
// We have different "agents" (modes) which can be switched in runtime
// - Connected agent is expose mutable position/rotation/scale objects and follow the changes of them. Useful to work with 3rd party libs (e.g. animejs). But recommended to avoid.
// - Kinematic agent is a mode that moves actor by angular velocity and linear velocity (vectors). Useful when you need to know the direction (e.g. bullet, car) of the object. Recommended way for NPCs.
// - Physical agent is a mode when model3d reads values from a physical body. Requires setup of physics. Recommended for environmental objects (e.g. physical bricks in a wall).
// - Default agent is providing almost nothing, but setters. Recommended for static objects.
// - Also: with every mode you can do position$.next() to "teleport" the object to the new position
export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const gui: GUI = new GUI();
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  const { cameraService, controlsService, lightService, models3dService, mouseService, scenesService, spatialGridService } = space.services;
  const { keyboardService } = engine.services;
  const { clickLeftRelease$ } = mouseService;
  const models3dRegistry: TModel3dRegistry = models3dService.getRegistry();

  const mode = { isTeleportationMode: false };

  function init(): void {
    const sceneW: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(sceneW)) throw new Error('Scene is not defined');

    const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');
    if (isNotDefined(grid)) throw new Error('Grid is not defined');

    const planeModel3dF: TModel3d | undefined = models3dRegistry.findByName('surface_model');
    if (isNotDefined(planeModel3dF)) throw new Error('Plane model is not defined');

    const camera: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(camera)) throw new Error('Camera is not defined');

    const controls: TOrbitControlsWrapper | undefined = controlsService.findActive();
    if (isNotDefined(controls)) throw new Error('Controls are not defined');

    const light: TPointLightWrapper | undefined = lightService.getRegistry().findByName('point_light') as TPointLightWrapper | undefined;
    if (isNotDefined(light)) throw new Error('Light is not defined');

    grid._debugVisualizeCells(sceneW, '#4e0c85');

    console.log('Click "space" to change actor movement mode ("agent")');

    sceneW.addModel3d(planeModel3dF);

    const actorCoords = new Vector3(0, 2, 0);
    const sphereActor: TActor = createActor('sphere', TransformAgent.Default, grid, actorCoords, '#E91E63', space.services);
    gui.add(mode, 'isTeleportationMode').name('Teleportation mode');
    addActorFolderGui(gui, sphereActor);

    createRepeaterActor(sphereActor, { x: 0, y: 0, z: 4 }, grid, gui, space.services);

    const intersectionsWatcher: TIntersectionsWatcher = startIntersections(space.services);

    addSpatialGuiFolder(gui, grid, intersectionsWatcher);

    connectCameraToActor(camera, controls, sphereActor, gui);
    connectObjToActor(light, sphereActor, gui);

    const { line } = createReactiveLineFromActor('#E91E63', sphereActor, intersectionsWatcher);
    sceneW.entity.add(line);

    clickLeftRelease$
      .pipe(withLatestFrom(intersectionsWatcher.value$, sphereActor.drive.agent$))
      .subscribe(([, intersection, agent]: [TMouseWatcherEvent, TIntersectionEvent, TransformAgent]): void => {
        moveActorTo(sphereActor, intersection.point, agent, mode.isTeleportationMode);
      });

    attachConnectorToSubj(sphereActor, intersectionsWatcher.value$.pipe(map((v: TIntersectionEvent): Vector3 => v.point)));

    changeActorActiveAgent(sphereActor, KeysExtra.Space, keyboardService);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
    console.log('Memory usage:', getHumanReadableMemorySize((window as any).performance.memory.usedJSHeapSize));
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}

// TODO 8.0.0. MODELS: would be nice to implement rotation and scale as well
function moveActorTo(actor: TActor, position: Vector3, agent: TransformAgent, isTeleportationMode: boolean): void | never {
  if (isTeleportationMode) return actor.drive.position$.next(position);

  switch (agent) {
    case TransformAgent.Default:
      return actor.drive.default.setPosition(position);
    case TransformAgent.Kinematic:
      actor.drive.kinematic.setLinearAzimuthRad(getMouseAzimuthAndElevation(position, actor.drive.getPosition()).azimuth);
      return actor.drive.kinematic.setLinearSpeed(meters(5));
    case TransformAgent.Connected:
      // no need to do anything here, cause already connected
      return undefined;
    case TransformAgent.Physical:
      // TODO 8.0.0. MODELS: Implement Physics movement
      return undefined;
    default:
      throw new Error(`Unknown agent: ${agent}`);
  }
}
