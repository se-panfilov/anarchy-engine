import type { Rotation, Vector } from '@dimforge/rapier3d';
import { ColliderDesc, RigidBodyDesc, World } from '@dimforge/rapier3d';
import type { Vector3 } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

import type { TShowcase } from '@/App/Levels/Models';
import type {
  TActorWrapperAsync,
  TAppCanvas,
  TCameraWrapper,
  TEngine,
  TIntersectionEvent,
  TIntersectionsWatcher,
  TIntersectionsWatcherParams,
  TPhysicsDebugRenderer,
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TWithCoordsXYZ
} from '@/Engine';
import {
  buildSpaceFromConfig,
  Engine,
  EulerWrapper,
  getHorizontalAzimuth,
  getPushCoordsFrom3dAzimuth,
  isDefined,
  isNotDefined,
  KeysExtra,
  mouseService,
  PhysicsDebugRenderer,
  STANDARD_GRAVITY,
  TextType,
  Vector3Wrapper
} from '@/Engine';
import { meters } from '@/Engine/Measurements/Utils';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { loopService, keyboardService } = engine.services;
  const { actorService, cameraService, intersectionsWatcherService, textService } = space.services;

  const actorAsyncRegistry = actorService.getRegistry();
  const sceneWrapper: TSceneWrapper = actorService.getScene();

  const ballActorPromise: Promise<TActorWrapperAsync | undefined> = actorAsyncRegistry.findByNameAsync('ball');
  const surfaceActorPromise: Promise<TActorWrapperAsync | undefined> = actorAsyncRegistry.findByNameAsync('surface');

  const world: World = new World(STANDARD_GRAVITY);
  const physicsDebugRenderer: TPhysicsDebugRenderer = PhysicsDebugRenderer(sceneWrapper.entity, world);

  const rigidBodyDesc = RigidBodyDesc.dynamic().setTranslation(0, 6, 0); //should take the position of the actor
  const rigidBody = world.createRigidBody(rigidBodyDesc);
  const colliderDesc = ColliderDesc.ball(meters(1));
  world.createCollider(colliderDesc, rigidBody);

  const line: Line2 = createLine();
  sceneWrapper.entity.add(line);

  const groundColliderDesc: ColliderDesc = ColliderDesc.cuboid(meters(10), meters(0.1), meters(10));
  world.createCollider(groundColliderDesc);

  let azimuth: number = 0;

  mouseService.clickLeftRelease$.subscribe(() => {
    rigidBody.setLinvel(getPushCoordsFrom3dAzimuth(azimuth, 0, 5), true);
  });

  keyboardService.onKey(KeysExtra.Space).pressed$.subscribe((): void => {
    const linvel = rigidBody.linvel();
    rigidBody.setLinvel({ x: linvel.x, y: linvel.y + 5, z: linvel.z }, true);
  });

  async function init(): Promise<void> {
    const ballActorW: TActorWrapperAsync | undefined = await ballActorPromise;
    if (isNotDefined(ballActorW)) throw new Error(`Cannot find "ball" actor`);

    const surfaceActorW: TActorWrapperAsync | undefined = await surfaceActorPromise;
    if (isNotDefined(surfaceActorW)) throw new Error(`Cannot find "surfaceActor" actor`);

    const cameraW: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(cameraW)) throw new Error(`Cannot find active camera`);

    const mouseLineIntersectionsWatcher: TIntersectionsWatcher = intersectionsWatcherService.create({
      name: 'mouse_line_intersections_watcher',
      isAutoStart: true,
      camera: cameraW,
      actors: [surfaceActorW],
      position$: mouseService.position$,
      tags: []
    } satisfies TIntersectionsWatcherParams);

    const azimuthText = textService.create({
      text: 'Azimuth...',
      type: TextType.Text3d,
      cssProps: { fontSize: '0.05rem' },
      position: Vector3Wrapper({ x: 3, y: 0, z: 6 }),
      rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
      tags: []
    });

    let mouseLineIntersectionsCoords: Vector3 | undefined = undefined;
    mouseLineIntersectionsWatcher.value$.subscribe((intersection: TIntersectionEvent) => {
      mouseLineIntersectionsCoords = intersection.point;
      const ballCoords: TWithCoordsXYZ = ballActorW.getPosition().getCoords();
      azimuth = getHorizontalAzimuth({ x: ballCoords.x, z: ballCoords.z }, mouseLineIntersectionsCoords);
      azimuthText.setText(`Azimuth: ${azimuth}`);
    });

    // TODO (S.Panfilov) extract physics world update to the main loop
    loopService.tick$.subscribe(() => {
      // Ste the simulation forward.
      world.step();

      if (isDefined(mouseLineIntersectionsCoords)) {
        const ballCoords: TWithCoordsXYZ = ballActorW.getPosition().getCoords();
        line.geometry.setPositions([ballCoords.x, ballCoords.y, ballCoords.z, mouseLineIntersectionsCoords.x, mouseLineIntersectionsCoords.y, mouseLineIntersectionsCoords.z]);
        line.computeLineDistances();
      }

      // Get and print the rigid-body's position.
      const position: Vector = rigidBody.translation();
      const rotation: Rotation = rigidBody.rotation();

      ballActorW.entity.position.set(position.x, position.y, position.z);
      ballActorW.entity.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);

      physicsDebugRenderer.update();
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
