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
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TWithCoordsXYZ,
  TWithMandatoryPhysicsBody
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
  mouseService,
  TextType,
  Vector3Wrapper
} from '@/Engine';
import { meters } from '@/Engine/Measurements/Utils';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { loopService, keyboardService } = engine.services;
  const { actorService, cameraService, intersectionsWatcherService, textService, physicsBodyService } = space.services;

  const actorAsyncRegistry = actorService.getRegistry();
  const sceneWrapper: TSceneWrapper = actorService.getScene();

  const ballActorPromise: Promise<TActorWrapperAsync | undefined> = actorAsyncRegistry.findByNameAsync('ball');
  const surfaceActorPromise: Promise<TActorWrapperAsync | undefined> = actorAsyncRegistry.findByNameAsync('surface');
  // const obstacle1ActorPromise: Promise<TActorWrapperAsync | undefined> = actorAsyncRegistry.findByNameAsync('obstacle_1');
  // const obstacle2ActorPromise: Promise<TActorWrapperAsync | undefined> = actorAsyncRegistry.findByNameAsync('obstacle_2');
  // const obstacle3ActorPromise: Promise<TActorWrapperAsync | undefined> = actorAsyncRegistry.findByNameAsync('obstacle_3');
  // const obstacle4ActorPromise: Promise<TActorWrapperAsync | undefined> = actorAsyncRegistry.findByNameAsync('obstacle_4');

  physicsBodyService.getDebugRenderer(loopService).start();

  // const ballRigidBodyDesc = RigidBodyDesc.dynamic().setTranslation(0, 6, 0);
  // const ballRigidBody = world.createRigidBody(ballRigidBodyDesc);
  // const ballColliderDesc = ColliderDesc.ball(meters(1));
  // world.createCollider(ballColliderDesc, ballRigidBody);

  const line: Line2 = createLine();
  sceneWrapper.entity.add(line);

  // createWallsAndFloor(world);
  // const cube1ObstacleRigidBody = createCubeObstacle(world, { x: -4, y: 2, z: 2 }, { x: 0, y: 0, z: 0 }, 0.5, 2, 0.5);
  // const cube2ObstacleRigidBody = createCubeObstacle(world, { x: 4, y: 2, z: 1 }, { x: 0, y: 0, z: 0 }, 0.5, 2, 0.5);
  // const ball3ObstacleRigidBody = createBallObstacle(world, { x: 1, y: 8, z: -4 }, 1);
  // const ball4ObstacleRigidBody = createBallObstacle(world, { x: 2, y: 12, z: -4 }, 1);

  let azimuth: number = 0;
  let forcePower: number = 0;

  async function init(): Promise<void> {
    const ballActorW: TWithMandatoryPhysicsBody<TActorWrapperAsync> | TActorWrapperAsync | undefined = await ballActorPromise;
    if (isNotDefined(ballActorW)) throw new Error(`Cannot find "ball" actor`);
    if (!isActorHasPhysicsBody(ballActorW)) throw new Error(`"ball" actor is not a physic actor`);

    const surfaceActorW: TWithMandatoryPhysicsBody<TActorWrapperAsync> | TActorWrapperAsync | undefined = await surfaceActorPromise;
    if (isNotDefined(surfaceActorW)) throw new Error(`Cannot find "surfaceActor" actor`);
    if (!isActorHasPhysicsBody(surfaceActorW)) throw new Error(`"surfaceActor" actor is not a physic actor`);

    // const obstacle1ActorW: THasPhysicsBody<TActorWrapperAsync> | TActorWrapperAsync | undefined = await obstacle1ActorPromise;
    // if (isNotDefined(obstacle1ActorW)) throw new Error(`Cannot find "obstacle1Actor" actor`);
    // if (!isActorHasPhysicsBody(obstacle1ActorW)) throw new Error(`"obstacle1Actor" actor is not a physic actor`);
    //
    // const obstacle2ActorW: THasPhysicsBody<TActorWrapperAsync> | TActorWrapperAsync | undefined = await obstacle2ActorPromise;
    // if (isNotDefined(obstacle2ActorW)) throw new Error(`Cannot find "obstacle2Actor" actor`);
    // if (!isActorHasPhysicsBody(obstacle2ActorW)) throw new Error(`"obstacle2Actor" actor is not a physic actor`);
    //
    // const obstacle3ActorW: THasPhysicsBody<TActorWrapperAsync> | TActorWrapperAsync | undefined = await obstacle3ActorPromise;
    // if (isNotDefined(obstacle3ActorW)) throw new Error(`Cannot find "obstacle3Actor" actor`);
    // if (!isActorHasPhysicsBody(obstacle3ActorW)) throw new Error(`"obstacle3Actor" actor is not a physic actor`);
    //
    // const obstacle4ActorW: THasPhysicsBody<TActorWrapperAsync> | TActorWrapperAsync | undefined = await obstacle4ActorPromise;
    // if (isNotDefined(obstacle4ActorW)) throw new Error(`Cannot find "obstacle4Actor" actor`);
    // if (!isActorHasPhysicsBody(obstacle4ActorW)) throw new Error(`"obstacle4Actor" actor is not a physic actor`);

    const cameraW: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(cameraW)) throw new Error(`Cannot find active camera`);

    console.log(ballActorW.physicsBody?.getRigidBody());

    mouseService.clickLeftRelease$.subscribe(() => {
      // TODO (S.Panfilov) debug "?" operator
      ballActorW.physicsBody?.getRigidBody()?.applyImpulse(getPushCoordsFrom3dAzimuth(azimuth, 0, forcePower * 10.5), true);
    });

    // TODO (S.Panfilov) enable
    // keyboardService.onKey(KeysExtra.Space).pressed$.subscribe((): void => {
    //   ballRigidBody.applyImpulse({ x: 0, y: 20, z: 0 }, true);
    // });

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

    // TODO (S.Panfilov) extract physics world update to the main loop
    loopService.tick$.subscribe(() => {
      // Ste the simulation forward.
      // world.step();

      // TODO (S.Panfilov) debug: this should not be done here, but instead in the service (with an option to manual update)
      const world = physicsBodyService.getWorld();
      if (isNotDefined(world)) throw new Error(`Cannot find physics world`);
      world.step();

      if (isDefined(mouseLineIntersectionsCoords)) {
        const ballCoords: TWithCoordsXYZ = ballActorW.getPosition().getCoords();
        azimuth = getHorizontalAzimuth({ x: ballCoords.x, z: ballCoords.z }, mouseLineIntersectionsCoords);
        azimuthText.setText(`Azimuth: ${azimuth}`);
        forcePowerText.setText(`Force: ${forcePower}`);
        forcePower = getDistance(ballActorW.getPosition().getCoords(), mouseLineIntersectionsCoords);
        line.geometry.setPositions([ballCoords.x, ballCoords.y, ballCoords.z, mouseLineIntersectionsCoords.x, mouseLineIntersectionsCoords.y, mouseLineIntersectionsCoords.z]);
        line.computeLineDistances();
      }

      // updateActorByPhysics(ballRigidBody, ballActorW);
      // updateActorByPhysics(cube1ObstacleRigidBody, obstacle1ActorW);
      // updateActorByPhysics(cube2ObstacleRigidBody, obstacle2ActorW);
      // updateActorByPhysics(ball3ObstacleRigidBody, obstacle3ActorW);
      // updateActorByPhysics(ball4ObstacleRigidBody, obstacle4ActorW);
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

// function createWallsAndFloor(world: World): void {
//   const groundColliderDesc: ColliderDesc = ColliderDesc.cuboid(meters(10), meters(0.1), meters(10));
//   world.createCollider(groundColliderDesc);
//
//   const wallLeftColliderDesc: ColliderDesc = ColliderDesc.cuboid(meters(0.5), meters(2.5), meters(10)).setTranslation(-10.5, 0, 0);
//   world.createCollider(wallLeftColliderDesc);
//
//   const wallRightColliderDesc: ColliderDesc = ColliderDesc.cuboid(meters(0.5), meters(2.5), meters(10)).setTranslation(10.5, 0, 0);
//   world.createCollider(wallRightColliderDesc);
//
//   const wallFrontColliderDesc: ColliderDesc = ColliderDesc.cuboid(meters(0.5), meters(2.5), meters(11))
//     .setTranslation(0, 0, -10.5)
//     .setRotation(degreesToQuaternion({ x: 0, y: 90, z: 0 }));
//   world.createCollider(wallFrontColliderDesc);
//
//   const wallBackColliderDesc: ColliderDesc = ColliderDesc.cuboid(meters(0.5), meters(2.5), meters(11))
//     .setTranslation(0, 0, 10.5)
//     .setRotation(degreesToQuaternion({ x: 0, y: 90, z: 0 }));
//   world.createCollider(wallBackColliderDesc);
// }

// function createCubeObstacle(world: World, position: TWithCoordsXYZ, rotation: TWithCoordsXYZ, hx: number, hy: number, hz: number): RigidBody {
//   const rigidBodyDesc = RigidBodyDesc.dynamic().setTranslation(position.x, position.y, position.z).setRotation(degreesToQuaternion(rotation));
//   const rigidBody = world.createRigidBody(rigidBodyDesc);
//   const colliderDesc = ColliderDesc.cuboid(meters(hx), meters(hy), meters(hz));
//   world.createCollider(colliderDesc, rigidBody);
//
//   return rigidBody;
// }
// function createBallObstacle(world: World, position: TWithCoordsXYZ, size: 1): RigidBody {
//   const rigidBodyDesc = RigidBodyDesc.dynamic().setTranslation(position.x, position.y, position.z);
//   const rigidBody = world.createRigidBody(rigidBodyDesc);
//   const colliderDesc = ColliderDesc.ball(meters(size));
//
//   world.createCollider(colliderDesc, rigidBody);
//
//   return rigidBody;
// }

// function updateActorByPhysics(rigidBody: RigidBody, actor: TActorWrapperAsync): void {
//   const position: Vector = rigidBody.translation();
//   const rotation: Rotation = rigidBody.rotation();
//
//   actor.setPosition(Vector3Wrapper(position));
//   actor.entity.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
// }
