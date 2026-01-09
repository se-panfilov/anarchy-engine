import type {
  TActor,
  TAnyCameraWrapper,
  TAnyControlsWrapper,
  TDegrees,
  TIntersectionEvent,
  TIntersectionsCameraWatcher,
  TModel3d,
  TModels3dRegistry,
  TMouseWatcherEvent,
  TParticlesWrapper,
  TPhysicsBodyParams,
  TPointLightWrapper,
  TRadians,
  TReadonlyQuaternion,
  TReadonlyVector3,
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TSpatialGridWrapper,
  TText3dWrapper,
  TTextAnyWrapper
} from '@Anarchy/Engine';
import {
  CollisionShape,
  ControlsType,
  degrees,
  ForwardAxis,
  getDistance,
  getElevation,
  getHorizontalAzimuth,
  getMouseAzimuthAndElevation,
  getPushCoordsFrom3dAzimuth,
  isOrbitControls,
  KeyCode,
  meters,
  metersPerSecond,
  radians,
  RigidBodyTypesNames,
  spaceService,
  TextType,
  TransformAgent
} from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import GUI from 'lil-gui';
import { BehaviorSubject, combineLatest, map, withLatestFrom } from 'rxjs';
import { Euler, Quaternion, Vector3 } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { degToRad, radToDeg } from 'three/src/math/MathUtils';

import type { TAppSettings } from '@/Models';
import { addGizmo, attachConnectorPositionToSubj, enableFPSCounter, getMemoryUsage, watchActiveRendererReady, watchResourceLoading } from '@/Utils';

import spaceConfigJson from './space.json';
import {
  addActorFolderGui,
  addKinematicActorFolderGui,
  addSpatialGuiFolder,
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

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);
  watchResourceLoading(space);
  if (settings.loopsDebugInfo) enableFPSCounter(space.loops.renderLoop.tick$);

  space.built$.subscribe(showcase);
}

//This showcase should demonstrate the ways we can move the actor.
// We have different "agents" (modes) which can be switched in runtime
// - Connected agent expose mutable position/rotation/scale objects and follow the changes of them. Useful to work with 3rd party libs. But recommended to avoid.
// - Kinematic agent is a mode that moves actor by angular velocity and linear velocity (vectors). Useful when you need to know the direction (e.g., bullet, car) of the object. Recommended way for NPCs.
// - Physics agent is a mode when model3d reads values from a physical body. Requires setup of physics. Recommended for environmental objects (e.g., physical bricks in a wall).
// - Default agent is providing almost nothing, but setters. Recommended for static objects.
// - Also: with every mode you can do position$.next() to "teleport" the object to the new position
export async function showcase(space: TSpace): Promise<void> {
  watchActiveRendererReady(space);
  const gui: GUI = new GUI();
  const { cameraService, controlsService, keyboardService, lightService, models3dService, mouseService, particlesService, physicsWorldService, scenesService, spatialGridService, textService } =
    space.services;
  const { physicsLoop } = space.loops;
  const { clickLeftRelease$ } = mouseService;
  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();

  const mode = { isTeleportationMode: false };

  const actorsOffsetY: number = 2;

  physicsWorldService.getDebugRenderer(physicsLoop).start();

  const foxModelName: string = 'fox_model';

  function preloadModels3d(): Promise<GLTF> {
    return models3dService.loadAsync({ name: foxModelName, url: 'resources/Models/Fox/Fox.glb', options: { scale: new Vector3(1, 1, 1) } });
  }

  await preloadModels3d();

  const sceneW: TSceneWrapper = scenesService.getActive();
  const grid: TSpatialGridWrapper = spatialGridService.getRegistry().getByName('main_grid');
  const planeModel3d: TModel3d = models3dRegistry.getByName('surface_model');
  const camera: TAnyCameraWrapper = cameraService.getActive();
  const controls: TAnyControlsWrapper = controlsService.getActive();
  if (!isOrbitControls(controls)) throw new Error(`Active controls are not of type "${ControlsType.OrbitControls}", but ${controls.getType()}`);

  const light: TPointLightWrapper = lightService.getRegistry().getByName('point_light') as TPointLightWrapper;
  const particles: TParticlesWrapper = particlesService.getRegistry().getByName('bubbles');
  const sphereText: TText3dWrapper = textService.getRegistries().text3dRegistry.getByName('sphere_text');

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  setParticles(particles);
  grid._debugVisualizeCells(sceneW, '#4e0c85');

  console.log('Click "space" to change actor movement mode ("agent")');

  sceneW.addModel3d(planeModel3d);

  const actorCoords = new Vector3(0, actorsOffsetY, 0);
  const sphereActorPhysicsParams: Omit<TPhysicsBodyParams, 'position' | 'rotation'> = {
    name: 'sphere_actor_physics',
    collisionShape: CollisionShape.Ball,
    type: RigidBodyTypesNames.Dynamic,
    shapeParams: {
      radius: 0.7
    },
    restitution: 0.9
  };

  const foxModel3dSource: GLTF = models3dService.getResourceRegistry().getByKey(foxModelName);

  const sphereActor: TActor = createActor('sphere', foxModel3dSource, TransformAgent.Default, grid, actorCoords.clone(), '#E91E63', sphereActorPhysicsParams, space.services);
  gui.add(mode, 'isTeleportationMode').name('Teleportation mode');
  addActorFolderGui(gui, sphereActor);
  addKinematicActorFolderGui(gui, sphereActor);

  combineLatest([sphereActor.drive.position$, sphereActor.drive.rotation$]).subscribe(([p, r]: [TReadonlyVector3, TReadonlyQuaternion]): void => {
    sphereText.setText(`x: ${p.x.toFixed(2)} y: ${p.y.toFixed(2)} z: ${p.z.toFixed(2)}, Rotation: ${radToDeg(r.y).toFixed(2)}`);
  });

  createRepeaterActor(sphereActor, sphereActor.model3d, { x: 0, y: 0, z: 4 }, grid, gui, space.services);

  const intersectionsWatcher: TIntersectionsCameraWatcher = startIntersections(space.services);

  addSpatialGuiFolder(gui, grid, intersectionsWatcher);

  connectCameraToActor(camera, controls, sphereActor, gui);
  connectObjToActor('Light', light, sphereActor, gui);
  connectObjToActor('Particles', particles, sphereActor, gui);
  connectObjToActor('Text', sphereText, sphereActor, gui);

  const { line } = createReactiveLineFromActor('#E91E63', sphereActor, intersectionsWatcher);
  sceneW.entity.add(line);

  const azimuthText: TTextAnyWrapper = textService.create({
    name: 'azimuth_text',
    text: 'Azimuth...',
    type: TextType.Text3d,
    cssProps: { fontSize: '0.05rem' },
    position: new Vector3(3, 0.3, 6),
    rotation: new Euler(-1.57, 0, 0)
  });

  const azimuth$: BehaviorSubject<{ azimuth: TDegrees; elevation: TDegrees }> = new BehaviorSubject<{
    azimuth: TDegrees;
    elevation: TDegrees;
  }>({ azimuth: degrees(0), elevation: degrees(0) });

  azimuth$.pipe(withLatestFrom(sphereActor.drive.agent$, intersectionsWatcher.value$)).subscribe(
    ([{ azimuth, elevation }, agent, intersection]: [
      {
        azimuth: TDegrees;
        elevation: TDegrees;
      },
      TransformAgent,
      TIntersectionEvent
    ]): void => {
      azimuthText.setText(`Azimuth: ${azimuth.toFixed(2)}, Elevation: ${elevation.toFixed(2)}`);

      //rotation is for a "default" agent, for "kinematic" agent we will use target position (vector) to look at
      const rotation: Quaternion = new Quaternion().setFromEuler(new Euler(degToRad(elevation * -1), degToRad(azimuth), 0, 'YXZ'));
      if (isNotDefined(intersection)) throw new Error('Intersection not defined');
      rotateActorTo(sphereActor, intersection.point, rotation, agent);
    }
  );

  intersectionsWatcher.value$.pipe(withLatestFrom(sphereActor.drive.position$)).subscribe(([v, actorPosition]: [TIntersectionEvent, TReadonlyVector3]): void => {
    if (isNotDefined(v)) throw new Error('Intersection not defined');
    const elevation: TRadians = getElevation(actorPosition.x, actorPosition.y, actorPosition.z, v.point);
    const azimuth: TRadians = getHorizontalAzimuth(actorPosition.x, actorPosition.z, v.point, ForwardAxis.Z);
    azimuth$.next({ azimuth: degrees(radToDeg(azimuth)), elevation: degrees(radToDeg(elevation)) });
  });

  clickLeftRelease$.pipe(withLatestFrom(intersectionsWatcher.value$, sphereActor.drive.agent$)).subscribe(([, intersection, agent]: [TMouseWatcherEvent, TIntersectionEvent, TransformAgent]): void => {
    if (isNotDefined(intersection)) throw new Error('Intersection not defined');
    const adjustedPoint: Vector3 = intersection.point.clone().add(new Vector3(0, 0, 0));
    moveActorTo(sphereActor, adjustedPoint, agent, mode.isTeleportationMode);
  });

  attachConnectorPositionToSubj(
    sphereActor,
    intersectionsWatcher.value$.pipe(
      map((v: TIntersectionEvent): Vector3 => {
        if (isNotDefined(v)) throw new Error('Intersection not defined');
        return v.point.add(new Vector3(0, actorsOffsetY, 0));
      })
    )
  );

  changeActorActiveAgent(sphereActor, KeyCode.Space, keyboardService);

  console.log('Memory usage:', getMemoryUsage());

  space.start$.next(true);
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
    case TransformAgent.Physics:
      forcePower = getDistance(actor.drive.position$.value, position);
      actor.drive.physics.physicsBody$.value?.getRigidBody()?.applyImpulse(getPushCoordsFrom3dAzimuth(azimuth, radians(0), forcePower * 1.5, ForwardAxis.Z), true);
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
    case TransformAgent.Physics:
      // Should not do anything here, cause physics agent should read values from physical body
      return undefined;
    default:
      throw new Error(`Unknown agent: ${agent}`);
  }
}
