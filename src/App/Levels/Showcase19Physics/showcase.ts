import { Euler, Vector3 } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo } from '@/App/Levels/Utils';
import type { TActor, TAppCanvas, TCameraWrapper, TEngine, TIntersectionEvent, TIntersectionsWatcher, TRadians, TSceneWrapper, TSpace, TSpaceConfig } from '@/Engine';
import {
  ambientContext,
  Engine,
  ForwardAxis,
  getDistance,
  getHorizontalAzimuth,
  getPushCoordsFrom3dAzimuth,
  isActorHasPhysicsBody,
  isDefined,
  isNotDefined,
  KeysExtra,
  spaceService,
  TextType
} from '@/Engine';
import { meters, radians } from '@/Engine/Measurements/Utils';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const { actorService, cameraService, intersectionsWatcherService, loopService, mouseService, textService, physicsWorldService } = space.services;

  const actorAsyncRegistry = actorService.getRegistry();
  const sceneWrapper: TSceneWrapper = actorService.getScene();

  function init(): void {
    physicsWorldService.getDebugRenderer(loopService).start();

    addGizmo(space.services, ambientContext.screenSizeWatcher, { placement: 'bottom-left' });

    const line: Line2 = createLine();
    sceneWrapper.entity.add(line);

    let azimuth: TRadians = radians(0);
    let forcePower: number = 0;

    const ballActor: TActor | undefined = actorAsyncRegistry.findByName('sphere_actor');
    if (isNotDefined(ballActor)) throw new Error(`Cannot find "ball" actor`);
    if (!isActorHasPhysicsBody(ballActor)) throw new Error(`"ball" actor is not a physic actor`);

    const surfaceActor: TActor | undefined = actorAsyncRegistry.findByName('surface_actor');
    if (isNotDefined(surfaceActor)) throw new Error(`Cannot find "surfaceActor" actor`);
    if (!isActorHasPhysicsBody(surfaceActor)) throw new Error(`"surfaceActor" actor is not a physic actor`);

    const cameraW: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(cameraW)) throw new Error(`Cannot find active camera`);

    mouseService.clickLeftRelease$.subscribe(() => {
      ballActor.drive.physical.physicsBody$.value?.getRigidBody()?.applyImpulse(getPushCoordsFrom3dAzimuth(azimuth, radians(0), forcePower * 10.5, ForwardAxis.Z), true);
    });

    keyboardService.onKey(KeysExtra.Space).pressed$.subscribe((): void => {
      // TODO CWP: 8.0.0. MODELS: Perhaps, "applyImpulse" (and similar functions) should be available via physical drive
      ballActor.drive.physical.physicsBody$.value?.getRigidBody()?.applyImpulse({ x: 0, y: 20, z: 0 }, true);
    });

    const mouseLineIntersectionsWatcher: TIntersectionsWatcher = intersectionsWatcherService.create({
      name: 'mouse_line_intersections_watcher',
      isAutoStart: true,
      camera: cameraW,
      actors: [surfaceActor],
      position$: mouseService.position$
    });

    const azimuthText = textService.create({
      text: 'Azimuth...',
      type: TextType.Text3d,
      cssProps: { fontSize: '0.05rem' },
      position: new Vector3(3, 0.3, 6),
      rotation: new Euler(-1.57, 0, 0)
    });

    const forcePowerText = textService.create({
      text: 'Force...',
      type: TextType.Text3d,
      cssProps: { fontSize: '0.05rem' },
      position: new Vector3(3, 0.3, 7),
      rotation: new Euler(-1.57, 0, 0)
    });

    let mouseLineIntersectionsCoords: Vector3 | undefined = undefined;
    mouseLineIntersectionsWatcher.value$.subscribe((intersection: TIntersectionEvent) => {
      mouseLineIntersectionsCoords = intersection.point;
    });

    loopService.tick$.subscribe(() => {
      if (isDefined(mouseLineIntersectionsCoords)) {
        const ballCoords: Vector3 = ballActor.drive.getPosition();
        azimuth = getHorizontalAzimuth(ballCoords.x, ballCoords.z, mouseLineIntersectionsCoords, ForwardAxis.Z);
        azimuthText.setText(`Azimuth: ${azimuth.toFixed(2)}`);
        forcePowerText.setText(`Force: ${forcePower.toFixed(2)}`);
        forcePower = getDistance(ballActor.drive.getPosition(), mouseLineIntersectionsCoords);
        line.geometry.setPositions([ballCoords.x, ballCoords.y, ballCoords.z, mouseLineIntersectionsCoords.x, mouseLineIntersectionsCoords.y, mouseLineIntersectionsCoords.z]);
        line.computeLineDistances();
      }
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
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
