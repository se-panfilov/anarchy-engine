import type { Vector3 } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

import type { TShowcase } from '@/App/Levels/Models';
import type {
  TActorWrapperAsync,
  TActorWrapperWithPhysicsAsync,
  TAppCanvas,
  TCameraWrapper,
  TEngine,
  TIntersectionEvent,
  TIntersectionsWatcher,
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TWithCoordsXYZ
} from '@/Engine';
import {
  buildSpaceFromConfig,
  Engine,
  EulerWrapper,
  getDistance,
  getHorizontalAzimuth,
  getPushCoordsFrom3dAzimuth,
  isActorHasPhysicsBody,
  isDefined,
  isNotDefined,
  KeysExtra,
  mouseService,
  TextType,
  Vector3Wrapper
} from '@/Engine';
import { meters } from '@/Engine/Measurements/Utils';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const { actorService, cameraService, intersectionsWatcherService, loopService, textService, physicsWorldService } = space.services;

  const actorAsyncRegistry = actorService.getRegistry();
  const sceneWrapper: TSceneWrapper = actorService.getScene();

  const ballActorPromise: Promise<TActorWrapperAsync | undefined> = actorAsyncRegistry.findByNameAsync('ball');
  const surfaceActorPromise: Promise<TActorWrapperAsync | undefined> = actorAsyncRegistry.findByNameAsync('surface');

  async function init(): Promise<void> {
    physicsWorldService.getDebugRenderer(loopService).start();

    const line: Line2 = createLine();
    sceneWrapper.entity.add(line);

    let azimuth: number = 0;
    let forcePower: number = 0;

    const ballActorW: TActorWrapperWithPhysicsAsync | TActorWrapperAsync | undefined = await ballActorPromise;
    if (isNotDefined(ballActorW)) throw new Error(`Cannot find "ball" actor`);
    if (!isActorHasPhysicsBody(ballActorW)) throw new Error(`"ball" actor is not a physic actor`);

    const surfaceActorW: TActorWrapperWithPhysicsAsync | TActorWrapperAsync | undefined = await surfaceActorPromise;
    if (isNotDefined(surfaceActorW)) throw new Error(`Cannot find "surfaceActor" actor`);
    if (!isActorHasPhysicsBody(surfaceActorW)) throw new Error(`"surfaceActor" actor is not a physic actor`);

    const cameraW: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(cameraW)) throw new Error(`Cannot find active camera`);

    mouseService.clickLeftRelease$.subscribe(() => {
      ballActorW.physicsBody.getRigidBody()?.applyImpulse(getPushCoordsFrom3dAzimuth(azimuth, 0, forcePower * 10.5), true);
    });

    keyboardService.onKey(KeysExtra.Space).pressed$.subscribe((): void => {
      ballActorW.physicsBody.getRigidBody()?.applyImpulse({ x: 0, y: 20, z: 0 }, true);
    });

    const mouseLineIntersectionsWatcher: TIntersectionsWatcher = intersectionsWatcherService.create({
      name: 'mouse_line_intersections_watcher',
      isAutoStart: true,
      camera: cameraW,
      actors: [surfaceActorW],
      position$: mouseService.position$,
      tags: []
    });

    const azimuthText = textService.create({
      text: 'Azimuth...',
      type: TextType.Text3d,
      cssProps: { fontSize: '0.05rem' },
      position: Vector3Wrapper({ x: 3, y: 0, z: 6 }),
      rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
      tags: []
    });

    const forcePowerText = textService.create({
      text: 'Force...',
      type: TextType.Text3d,
      cssProps: { fontSize: '0.05rem' },
      position: Vector3Wrapper({ x: 3, y: 0, z: 7 }),
      rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
      tags: []
    });

    let mouseLineIntersectionsCoords: Vector3 | undefined = undefined;
    mouseLineIntersectionsWatcher.value$.subscribe((intersection: TIntersectionEvent) => {
      mouseLineIntersectionsCoords = intersection.point;
    });

    loopService.tick$.subscribe(() => {
      if (isDefined(mouseLineIntersectionsCoords)) {
        const ballCoords: TWithCoordsXYZ = ballActorW.getPosition().getCoords();
        azimuth = getHorizontalAzimuth({ x: ballCoords.x, z: ballCoords.z }, mouseLineIntersectionsCoords);
        azimuthText.setText(`Azimuth: ${azimuth}`);
        forcePowerText.setText(`Force: ${forcePower}`);
        forcePower = getDistance(ballActorW.getPosition().getCoords(), mouseLineIntersectionsCoords);
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
