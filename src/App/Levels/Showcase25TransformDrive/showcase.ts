import GUI from 'lil-gui';
import { BehaviorSubject, combineLatest, map, withLatestFrom } from 'rxjs';
import { Euler, Quaternion, Vector3 } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { degToRad, radToDeg } from 'three/src/math/MathUtils';

import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo, getMemoryUsage } from '@/App/Levels/Utils';
import type {
  TActor,
  TCameraWrapper,
  TControlsWrapper,
  TDegrees,
  TEngine,
  TIntersectionEvent,
  TIntersectionsWatcher,
  TModel3d,
  TModels3dRegistry,
  TMouseWatcherEvent,
  TParticlesWrapper,
  TPointLightWrapper,
  TRadians,
  TReadonlyQuaternion,
  TReadonlyVector3,
  TRendererWrapper,
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TSpatialGridWrapper,
  TText3dWrapper,
  TTextAnyWrapper,
  TWithPresetNamePhysicsBodyParams
} from '@/Engine';
import {
  ambientContext,
  ControlsType,
  degrees,
  Engine,
  ForwardAxis,
  getDistance,
  getElevation,
  getHorizontalAzimuth,
  getMouseAzimuthAndElevation,
  getPushCoordsFrom3dAzimuth,
  isNotDefined,
  isOrbitControls,
  KeysExtra,
  meters,
  metersPerSecond,
  radians,
  spaceService,
  TextType,
  TransformAgent
} from '@/Engine';

import spaceConfigJson from './showcase.json';
import {
  addActorFolderGui,
  addKinematicActorFolderGui,
  addSpatialGuiFolder,
  attachConnectorPositionToSubj,
  changeActorActiveAgent,
  connectCameraToActor,
  connectObjToActor,
  createActor,
  createReactiveLineFromActor,
  createRepeaterActor,
  setParticles,
  startIntersections
} from './Utils';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

//This showcase should demonstrate the ways we can move the actor.
// We have different "agents" (modes) which can be switched in runtime
// - Connected agent is expose mutable position/rotation/scale objects and follow the changes of them. Useful to work with 3rd party libs (e.g. animejs). But recommended to avoid.
// - Kinematic agent is a mode that moves actor by angular velocity and linear velocity (vectors). Useful when you need to know the direction (e.g. bullet, car) of the object. Recommended way for NPCs.
// - Physical agent is a mode when model3d reads values from a physical body. Requires setup of physics. Recommended for environmental objects (e.g. physical bricks in a wall).
// - Default agent is providing almost nothing, but setters. Recommended for static objects.
// - Also: with every mode you can do position$.next() to "teleport" the object to the new position
export function showcase(): TShowcase {
  const gui: GUI = new GUI();
  const spaces: ReadonlyArray<TSpace> = spaceService.createFromConfig([spaceConfig]);
  // TODO 14-0-0: implement spaceService.findActive()
  const space: TSpace = spaces[0];
  const engine: TEngine = Engine(space);
  const { cameraService, controlsService, lightService, models3dService, mouseService, particlesService, physicsWorldService, rendererService, scenesService, spatialGridService, textService } =
    space.services;
  const { physicalLoop } = space.loops;
  const { keyboardService } = engine.services;
  const { clickLeftRelease$ } = mouseService;
  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();

  const mode = { isTeleportationMode: false };

  const actorsOffsetY: number = 2;

  physicsWorldService.getDebugRenderer(physicalLoop).start();

  const foxModelName: string = 'fox_model';

  function preloadModels3d(): Promise<GLTF> {
    return models3dService.loadAsync({ name: foxModelName, url: '/Showcase/Models/Fox/Fox.glb', options: { scale: new Vector3(1, 1, 1) } });
  }

  function init(): void {
    const sceneW: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(sceneW)) throw new Error('Scene is not defined');

    const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');
    if (isNotDefined(grid)) throw new Error('Grid is not defined');

    const planeModel3d: TModel3d | undefined = models3dRegistry.findByName('surface_model');
    if (isNotDefined(planeModel3d)) throw new Error('Plane model is not defined');

    const camera: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(camera)) throw new Error('Camera is not defined');

    const controls: TControlsWrapper | undefined = controlsService.findActive();
    if (isNotDefined(controls)) throw new Error('Controls are not defined');
    if (!isOrbitControls(controls)) throw new Error(`Active controls are not of type "${ControlsType.OrbitControls}", but ${controls.getType()}`);

    const light: TPointLightWrapper | undefined = lightService.getRegistry().findByName('point_light') as TPointLightWrapper | undefined;
    if (isNotDefined(light)) throw new Error('Light is not defined');

    const particles: TParticlesWrapper | undefined = particlesService.getRegistry().findByName('bubbles');
    if (isNotDefined(particles)) throw new Error('Particles are not defined');

    const sphereText: TText3dWrapper | undefined = textService.getRegistries().text3dRegistry.findByName('sphere_text');
    if (isNotDefined(sphereText)) throw new Error('Text is not defined');

    const renderer: TRendererWrapper | undefined = rendererService.findActive();
    if (isNotDefined(renderer)) throw new Error('Renderer is not defined');

    addGizmo(space.services, ambientContext.screenSizeWatcher, space.loops, { placement: 'bottom-left' });

    setParticles(particles);
    grid._debugVisualizeCells(sceneW, '#4e0c85');

    console.log('Click "space" to change actor movement mode ("agent")');

    sceneW.addModel3d(planeModel3d);

    const actorCoords = new Vector3(0, actorsOffsetY, 0);
    const sphereActorPhysics: TWithPresetNamePhysicsBodyParams = {
      presetName: 'ball_physics',
      shapeParams: {
        radius: 0.7
      },
      restitution: 0.9
    };

    const foxModel3dSource: GLTF | undefined = models3dService.getResourceRegistry().findByKey(foxModelName);
    if (isNotDefined(foxModel3dSource)) throw new Error('Fox model is not defined');

    const sphereActor: TActor = createActor('sphere', foxModel3dSource, TransformAgent.Default, grid, actorCoords, '#E91E63', sphereActorPhysics, space.services);
    gui.add(mode, 'isTeleportationMode').name('Teleportation mode');
    addActorFolderGui(gui, sphereActor);
    addKinematicActorFolderGui(gui, sphereActor);

    combineLatest([sphereActor.drive.position$, sphereActor.drive.rotation$]).subscribe(([p, r]: [TReadonlyVector3, TReadonlyQuaternion]): void => {
      sphereText.setText(`x: ${p.x.toFixed(2)} y: ${p.y.toFixed(2)} z: ${p.z.toFixed(2)}, Rotation: ${radToDeg(r.y).toFixed(2)}`);
    });

    createRepeaterActor(sphereActor, sphereActor.model3d, { x: 0, y: 0, z: 4 }, grid, gui, space.services);

    const intersectionsWatcher: TIntersectionsWatcher = startIntersections(space.services);

    addSpatialGuiFolder(gui, grid, intersectionsWatcher);

    connectCameraToActor(camera, controls, sphereActor, gui);
    connectObjToActor('Light', light, sphereActor, gui);
    connectObjToActor('Particles', particles, sphereActor, gui);
    connectObjToActor('Text', sphereText, sphereActor, gui);

    const { line } = createReactiveLineFromActor('#E91E63', sphereActor, intersectionsWatcher);
    sceneW.entity.add(line);

    const azimuthText: TTextAnyWrapper = textService.create({
      text: 'Azimuth...',
      type: TextType.Text3d,
      cssProps: { fontSize: '0.05rem' },
      position: new Vector3(3, 0.3, 6),
      rotation: new Euler(-1.57, 0, 0)
    });

    const azimuth$: BehaviorSubject<{ azimuth: TDegrees; elevation: TDegrees }> = new BehaviorSubject<{ azimuth: TDegrees; elevation: TDegrees }>({ azimuth: degrees(0), elevation: degrees(0) });

    azimuth$
      .pipe(withLatestFrom(sphereActor.drive.agent$, intersectionsWatcher.value$))
      .subscribe(([{ azimuth, elevation }, agent, { point }]: [{ azimuth: TDegrees; elevation: TDegrees }, TransformAgent, TIntersectionEvent]): void => {
        azimuthText.setText(`Azimuth: ${azimuth.toFixed(2)}, Elevation: ${elevation.toFixed(2)}`);

        //rotation is for a "default" agent, for "kinematic" agent we will use target position (vector) to look at
        const rotation: Quaternion = new Quaternion().setFromEuler(new Euler(degToRad(elevation * -1), degToRad(azimuth), 0, 'YXZ'));
        rotateActorTo(sphereActor, point, rotation, agent);
      });

    intersectionsWatcher.value$.pipe(withLatestFrom(sphereActor.drive.position$)).subscribe(([v, actorPosition]: [TIntersectionEvent, TReadonlyVector3]): void => {
      const elevation: TRadians = getElevation(actorPosition.x, actorPosition.y, actorPosition.z, v.point);
      const azimuth: TRadians = getHorizontalAzimuth(actorPosition.x, actorPosition.z, v.point, ForwardAxis.Z);
      azimuth$.next({ azimuth: degrees(radToDeg(azimuth)), elevation: degrees(radToDeg(elevation)) });
    });

    clickLeftRelease$
      .pipe(withLatestFrom(intersectionsWatcher.value$, sphereActor.drive.agent$))
      .subscribe(([, intersection, agent]: [TMouseWatcherEvent, TIntersectionEvent, TransformAgent]): void => {
        const adjustedPoint: Vector3 = intersection.point.clone().add(new Vector3(0, 0, 0));
        moveActorTo(sphereActor, adjustedPoint, agent, mode.isTeleportationMode);
      });

    attachConnectorPositionToSubj(sphereActor, intersectionsWatcher.value$.pipe(map((v: TIntersectionEvent): Vector3 => v.point.add(new Vector3(0, actorsOffsetY, 0)))));

    changeActorActiveAgent(sphereActor, KeysExtra.Space, keyboardService);

    console.log('Memory usage:', getMemoryUsage());
  }

  async function start(): Promise<void> {
    engine.start();
    await preloadModels3d();
    void init();
  }

  return { start, space };
}

function moveActorTo(actor: TActor, position: Vector3, agent: TransformAgent, isTeleportationMode: boolean): void | never {
  if (isTeleportationMode) return actor.drive.position$.next(position);

  let forcePower: number = 1;
  const azimuth: TRadians = getMouseAzimuthAndElevation(position, actor.drive.position$.value).azimuth;

  switch (agent) {
    case TransformAgent.Default:
      return actor.drive.default.setPosition(position);
    case TransformAgent.Kinematic:
      // return actor.drive.kinematic.setLinearSpeed(metersPerSecond(5));
      // return actor.drive.kinematic.moveTo(position, KinematicSpeed.Instant);
      // actor.drive.kinematic.setLinearAzimuth(getHorizontalAzimuth(actor.drive.position$.value.x, actor.drive.position$.value.z, position));

      // actor.drive.kinematic.setLinearAzimuth(getAzimuthElevationFromVector(position, 'Z').azimuth);
      // actor.drive.kinematic.setLinearElevation(degToRad(45));
      // actor.drive.kinematic.setLinearSpeed(metersPerSecond(5));
      return actor.drive.kinematic.moveTo(position, metersPerSecond(5));
    case TransformAgent.Connected:
      // no need to do anything here, cause already connected
      return undefined;
    case TransformAgent.Physical:
      forcePower = getDistance(actor.drive.position$.value, position);
      actor.drive.physical.physicsBody$.value?.getRigidBody()?.applyImpulse(getPushCoordsFrom3dAzimuth(azimuth, radians(0), forcePower * 1.5, ForwardAxis.Z), true);
      return undefined;
    default:
      throw new Error(`Unknown agent: ${agent}`);
  }
}

function rotateActorTo(actor: TActor, lookToTarget: Vector3, rotation: Quaternion, agent: TransformAgent): void {
  switch (agent) {
    case TransformAgent.Default:
      return actor.drive.default.setRotation(rotation);
    case TransformAgent.Kinematic:
      actor.drive.kinematic.setRadius(meters(1));
      return actor.drive.kinematic.lookAt(lookToTarget, metersPerSecond(5));
    // return actor.drive.kinematic.lookAt(lookToTarget, KinematicSpeed.Instant);
    // return actor.drive.kinematic.rotateTo(rotation, metersPerSecond(5));
    // return actor.drive.kinematic.rotateTo(rotation, metersPerSecond(5), true);
    case TransformAgent.Connected:
      // no need to do anything here, cause already connected
      return undefined;
    case TransformAgent.Physical:
      // Should not do anything here, cause physical agent should read values from physical body
      return undefined;
    default:
      throw new Error(`Unknown agent: ${agent}`);
  }
}
