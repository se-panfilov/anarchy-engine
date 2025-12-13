import type { TActor, TAnyCameraWrapper, TIntersectionEvent, TIntersectionsCameraWatcher, TRadians, TReadonlyVector3, TSceneWrapper, TSpace, TSpaceConfig, TTextAnyWrapper } from '@Anarchy/Engine';
import { ForwardAxis, getDistance, getHorizontalAzimuth, getPushCoordsFrom3dAzimuth, isActorHasPhysicsBody, KeyCode, spaceService, TextType } from '@Anarchy/Engine';
import { meters, radians } from '@Anarchy/Engine/Measurements/Utils';
import { asRecord, isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import { Euler, Vector3 } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

import type { TAppSettings } from '@/Models';
import { addGizmo, enableFPSCounter } from '@/Utils';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);
  if (settings.loopsDebugInfo) enableFPSCounter(space.loops.renderLoop.tick$);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const { actorService, cameraService, intersectionsWatcherService, keyboardService, mouseService, textService, physicsWorldService } = space.services;
  const { physicsLoop, intersectionsLoop } = space.loops;

  const actorAsyncRegistry = actorService.getRegistry();
  const sceneWrapper: TSceneWrapper = actorService.getScene();

  physicsWorldService.getDebugRenderer(physicsLoop).start();

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  const line: Line2 = createLine();
  sceneWrapper.entity.add(line);

  let azimuth: TRadians = radians(0);
  let forcePower: number = 0;

  const ballActor: TActor = actorAsyncRegistry.getByName('sphere_actor');
  if (!isActorHasPhysicsBody(ballActor)) throw new Error(`"ball" actor is not a physics actor`);

  const surfaceActor: TActor = actorAsyncRegistry.getByName('surface_actor');
  if (!isActorHasPhysicsBody(surfaceActor)) throw new Error(`"surfaceActor" actor is not a physics actor`);

  const cameraW: TAnyCameraWrapper = cameraService.getActive();

  mouseService.clickLeftRelease$.subscribe(() => {
    ballActor.drive.physics.physicsBody$.value?.getRigidBody()?.applyImpulse(getPushCoordsFrom3dAzimuth(azimuth, radians(0), forcePower * 10.5, ForwardAxis.X), true);
  });

  keyboardService.onKey(KeyCode.Space).pressed$.subscribe((): void => {
    ballActor.drive.physics.physicsBody$.value?.getRigidBody()?.applyImpulse({ x: 0, y: 20, z: 0 }, true);
  });

  const mouseLineIntersectionsWatcher: TIntersectionsCameraWatcher = intersectionsWatcherService.create({
    name: 'mouse_line_intersections_watcher',
    isAutoStart: true,
    camera: cameraW,
    actors: [surfaceActor],
    position$: mouseService.normalizedPosition$,
    intersectionsLoop
  }) as TIntersectionsCameraWatcher;

  const azimuthText: TTextAnyWrapper = textService.create({
    name: 'azimuth_text',
    text: 'Azimuth...',
    type: TextType.Text3d,
    cssProps: { fontSize: '0.05rem' },
    position: new Vector3(3, 0.3, 6),
    rotation: new Euler(-1.57, 0, 0)
  });

  const forcePowerText: TTextAnyWrapper = textService.create({
    name: 'force_text',
    text: 'Force...',
    type: TextType.Text3d,
    cssProps: { fontSize: '0.05rem' },
    position: new Vector3(3, 0.3, 7),
    rotation: new Euler(-1.57, 0, 0)
  });

  let mouseLineIntersectionsCoords: Vector3 | undefined = undefined;
  mouseLineIntersectionsWatcher.value$.subscribe((intersection: TIntersectionEvent): void => {
    mouseLineIntersectionsCoords = intersection?.point;
  });

  physicsLoop.tick$.subscribe(() => {
    if (isDefined(mouseLineIntersectionsCoords)) {
      const ballCoords: TReadonlyVector3 = ballActor.drive.position$.value;
      azimuth = getHorizontalAzimuth(ballCoords.x, ballCoords.z, mouseLineIntersectionsCoords, ForwardAxis.Z);
      azimuthText.setText(`Azimuth: ${azimuth.toFixed(2)}`);
      forcePowerText.setText(`Force: ${forcePower.toFixed(2)}`);
      forcePower = getDistance(ballActor.drive.position$.value, mouseLineIntersectionsCoords);
      line.geometry.setPositions([ballCoords.x, ballCoords.y, ballCoords.z, mouseLineIntersectionsCoords.x, mouseLineIntersectionsCoords.y, mouseLineIntersectionsCoords.z]);
      line.computeLineDistances();
    }
  });

  space.start$.next(true);
}

// TODO LINES: refactor this with lines domain
function createLine(): Line2 {
  const material = new LineMaterial({
    color: '#E91E63',
    linewidth: meters(0.1),
    worldUnits: true,
    alphaToCoverage: true
  });
  const geometry: LineGeometry = new LineGeometry();
  geometry.setPositions([0, 0, 0, 0, 0, 0]);

  return new Line2(geometry, material);
}
