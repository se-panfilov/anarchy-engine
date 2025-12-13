import GUI from 'lil-gui';
import { map, withLatestFrom } from 'rxjs';
import { Vector3 } from 'three';
import { radToDeg } from 'three/src/math/MathUtils';

import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo } from '@/App/Levels/Utils';
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
  TParticlesWrapper,
  TPointLightWrapper,
  TRendererWrapper,
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TSpatialGridWrapper,
  TText3dWrapper,
  TWithPresetNamePhysicsBodyParams
} from '@/Engine';
import { Engine, getDistancePrecisely, getMouseAzimuthAndElevation, getPushCoordsFrom3dAzimuthDeg, isNotDefined, KeysExtra, spaceService, TransformAgent } from '@/Engine';
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
  setParticles,
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
  const {
    cameraService,
    controlsService,
    lightService,
    models3dService,
    mouseService,
    particlesService,
    physicsWorldService,
    physicsLoopService,
    rendererService,
    scenesService,
    spatialGridService,
    textService
  } = space.services;
  const { keyboardService } = engine.services;
  const { clickLeftRelease$ } = mouseService;
  const models3dRegistry: TModel3dRegistry = models3dService.getRegistry();

  const mode = { isTeleportationMode: false };

  const actorsOffsetY: number = 2;

  physicsWorldService.getDebugRenderer(physicsLoopService).start();

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

    const particles: TParticlesWrapper | undefined = particlesService.getRegistry().findByName('bubbles');
    if (isNotDefined(particles)) throw new Error('Particles are not defined');

    const sphereText: TText3dWrapper | undefined = textService.getRegistries().text3dRegistry.findByName('sphere_text');
    if (isNotDefined(sphereText)) throw new Error('Text is not defined');

    const renderer: TRendererWrapper | undefined = rendererService.findActive();
    if (isNotDefined(renderer)) throw new Error('Renderer is not defined');

    addGizmo(space.services, { placement: 'bottom-left' });

    setParticles(particles);
    grid._debugVisualizeCells(sceneW, '#4e0c85');

    console.log('Click "space" to change actor movement mode ("agent")');

    sceneW.addModel3d(planeModel3dF);

    const actorCoords = new Vector3(0, actorsOffsetY, 0);
    const sphereActorPhysics: TWithPresetNamePhysicsBodyParams = {
      presetName: 'ball_physics',
      shapeParams: {
        radius: 0.7
      },
      restitution: 0.9
    };
    const sphereActor: TActor = createActor('sphere', TransformAgent.Default, grid, actorCoords, '#E91E63', sphereActorPhysics, space.services);
    gui.add(mode, 'isTeleportationMode').name('Teleportation mode');
    addActorFolderGui(gui, sphereActor);

    createRepeaterActor(sphereActor, { x: 0, y: 0, z: 4 }, grid, gui, space.services);

    const intersectionsWatcher: TIntersectionsWatcher = startIntersections(space.services);

    addSpatialGuiFolder(gui, grid, intersectionsWatcher);

    connectCameraToActor(camera, controls, sphereActor, gui);
    connectObjToActor('Light', light, sphereActor, gui);
    connectObjToActor('Particles', particles, sphereActor, gui);
    connectObjToActor('Text', sphereText, sphereActor, gui);

    const { line } = createReactiveLineFromActor('#E91E63', sphereActor, intersectionsWatcher);
    sceneW.entity.add(line);

    clickLeftRelease$
      .pipe(withLatestFrom(intersectionsWatcher.value$, sphereActor.drive.agent$))
      .subscribe(([, intersection, agent]: [TMouseWatcherEvent, TIntersectionEvent, TransformAgent]): void => {
        const adjustedPoint: Vector3 = intersection.point.clone().add(new Vector3(0, 0, 0));
        moveActorTo(sphereActor, adjustedPoint, agent, mode.isTeleportationMode);
      });

    attachConnectorToSubj(sphereActor, intersectionsWatcher.value$.pipe(map((v: TIntersectionEvent): Vector3 => v.point.add(new Vector3(0, actorsOffsetY, 0)))));

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

  let forcePower: number = 1;
  const azimuth: number = getMouseAzimuthAndElevation(position, actor.drive.getPosition()).azimuth;

  switch (agent) {
    case TransformAgent.Default:
      return actor.drive.default.setPosition(position);
    case TransformAgent.Kinematic:
      actor.drive.kinematic.setLinearAzimuthRad(azimuth);
      return actor.drive.kinematic.setLinearSpeed(meters(5));
    case TransformAgent.Connected:
      // no need to do anything here, cause already connected
      return undefined;
    case TransformAgent.Physical:
      forcePower = getDistancePrecisely(actor.drive.getPosition(), position).toNumber();
      actor.drive.physical.physicsBody$.value?.getRigidBody()?.applyImpulse(getPushCoordsFrom3dAzimuthDeg(radToDeg(azimuth), 0, forcePower * 1.5), true);
      return undefined;
    default:
      throw new Error(`Unknown agent: ${agent}`);
  }
}
