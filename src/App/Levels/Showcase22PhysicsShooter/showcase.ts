import type { Intersection } from 'three';
import { Vector3 } from 'three';
import type { Line2 } from 'three/examples/jsm/lines/Line2';

import type { TShowcase } from '@/App/Levels/Models';
import { enableCollisions } from '@/App/Levels/Showcase22PhysicsShooter/utils/Collisions';
import type {
  TActorWrapperAsync,
  TActorWrapperWithPhysicsAsync,
  TAppCanvas,
  TCameraWrapper,
  TCollisionCheckResult,
  TEngine,
  TIntersectionEvent,
  TIntersectionsWatcher,
  TRadians,
  TSpace,
  TSpaceConfig,
  TSpatialGridWrapper,
  TWithCoordsXYZ
} from '@/Engine';
import { buildSpaceFromConfig, Engine, get3DAzimuthRad, isDefined, isNotDefined, KeysExtra } from '@/Engine';
import { meters } from '@/Engine/Measurements/Utils';

import spaceConfig from './showcase.json';
import type { TBullet } from './utils';
import {
  applyExplosionImpulse,
  buildTower,
  cameraFollowingActor,
  createHitEffect,
  createLine,
  getBulletsPool,
  initGui,
  moveActorBounce,
  shoot,
  startMoveActorWithKeyboard,
  updateBullets
} from './utils';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const { physicsLoopService, cameraService, actorService, loopService, mouseService, intersectionsWatcherService, spatialGridService } = space.services;

  async function init(): Promise<void> {
    // physicsWorldService.getDebugRenderer(loopService).start();
    // physicsLoopService.shouldAutoUpdate(false);

    const cameraW: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(cameraW)) throw new Error(`Cannot find active camera`);

    const heroW: TActorWrapperWithPhysicsAsync | TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('hero');
    if (isNotDefined(heroW)) throw new Error(`Cannot find "hero" actor`);

    const surface: TActorWrapperWithPhysicsAsync | TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('surface');
    if (isNotDefined(surface)) throw new Error(`Cannot find "surface" actor`);

    const sphereActorW: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('sphere');
    if (isNotDefined(sphereActorW)) throw new Error(`Cannot find "sphere" actor`);

    const spatialGrid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');
    if (isNotDefined(spatialGrid)) throw new Error(`Cannot find "main_grid" spatial grid`);

    const blocks = await buildTower(actorService, { x: 10, z: 0 }, 10, 10, 20, spatialGrid);
    // const blocks2 = await buildTower(actorService, { x: 20, z: 0 }, 5, 5, 15, spatialGrid);
    // await buildTower(actorService, { x: 0, z: 30 }, 6, 7, 18, spatialGrid);
    // await buildTower(actorService, { x: 17, z: 30 }, 7, 7, 35, spatialGrid);
    // await buildTower(actorService, { x: -15, z: -15 }, 10, 7, 15, spatialGrid);

    const maxBulletsSameTime: number = 15;
    const bullets: ReadonlyArray<TBullet> = await Promise.all(getBulletsPool(maxBulletsSameTime, actorService, spatialGridService));
    const sceneW = actorService.getScene();
    sceneW.entity.add(...bullets.map((b: TBullet) => b.entity));
    bullets.forEach((b: TBullet) => {
      b.hit$.subscribe((hit: TCollisionCheckResult): void => {
        console.log('hit', hit);
        createHitEffect(hit.collisionPoint, sceneW);
        applyExplosionImpulse(hit.object, hit.collisionPoint, 10);
      });
    });

    const mouseLineIntersectionsWatcher: TIntersectionsWatcher = intersectionsWatcherService.create({
      name: 'mouse_line_intersections_watcher',
      isAutoStart: true,
      camera: cameraW,
      actors: [...blocks, surface, sphereActorW],
      position$: mouseService.position$,
      tags: []
    });

    startMoveActorWithKeyboard(heroW, keyboardService, mouseLineIntersectionsWatcher);

    await enableCollisions(mouseLineIntersectionsWatcher, space.services);

    let mouseLineIntersections: TIntersectionEvent = { point: new Vector3(), distance: 0 } as Intersection;
    mouseLineIntersectionsWatcher.value$.subscribe((intersection: TIntersectionEvent): void => void (mouseLineIntersections = intersection));

    const line: Line2 = createLine('#E91E63', 0.1);
    actorService.getScene().entity.add(line);

    let fromHeroAngles: Readonly<{ azimuth: TRadians; elevation: TRadians }> = {
      azimuth: 0,
      elevation: 0
    };

    //move bouncing sphere to target practice
    moveActorBounce(sphereActorW, 4.3, 210, 5000);

    const targetActor1W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('target_1');
    if (isNotDefined(targetActor1W)) throw new Error(`Cannot find "target_1" actor`);
    const targetActor2W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('target_2');
    if (isNotDefined(targetActor2W)) throw new Error(`Cannot find "target_2" actor`);
    const targetActor3W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('target_3');
    if (isNotDefined(targetActor3W)) throw new Error(`Cannot find "target_3" actor`);

    // TODO (S.Panfilov) CWP also sometimes bullets are going through the target (especially a distant ones) (what if we need to set radius?)
    // TODO (S.Panfilov) CWP check each actor's grid name in config against spatial grids (should have at least one grid)
    // TODO (S.Panfilov) CWP add some visual effect when bullet hits the target (and tracer for the bullet, to easier check the direction)
    // TODO (S.Panfilov) CWP add physical explosion on physical blocks (when hit)
    // TODO (S.Panfilov) CWP check collisions on minimal distance (to avoid bullets going through the target)
    // TODO (S.Panfilov) CWP refactor objects creation (do not add to a registry immediately, cause in that case if we extend, there will be unextetended version in the registy)
    moveActorBounce(targetActor1W, 4, -270, 3000);
    // TODO setTimout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
    setTimeout(() => moveActorBounce(targetActor2W, 4.5, -270, 3000), 500);
    // TODO setTimout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
    setTimeout(() => moveActorBounce(targetActor3W, 5, -270, 3000), 1000);

    initGui(mouseLineIntersectionsWatcher, spatialGridService, actorService);

    loopService.tick$.subscribe((delta): void => {
      cameraFollowingActor(cameraW, heroW);
      updateBullets(bullets, delta.delta, spatialGrid);

      // TODO this should be updated only if coords or angle are changed
      if (isDefined(mouseLineIntersections.point)) {
        const heroCoords: TWithCoordsXYZ = heroW.getPosition().getCoords();
        const azimuth3d = get3DAzimuthRad(heroCoords, mouseLineIntersections.point);
        fromHeroAngles = { ...azimuth3d, elevation: azimuth3d.elevation >= 0 ? azimuth3d.elevation : 0 };
        // TODO could make some use of mouseLineIntersectionsWatcher.latest$ instead of mouseLineIntersections
        line.geometry.setPositions([heroCoords.x, heroCoords.y, heroCoords.z, mouseLineIntersections.point.x, mouseLineIntersections.point.y, mouseLineIntersections.point.z]);
        line.computeLineDistances();
      }
    });

    mouseService.clickLeftRelease$.subscribe((): void => {
      if (isNotDefined(heroW)) throw new Error(`Cannot find "hero" actor`);
      shoot(heroW.getPosition().getCoords(), fromHeroAngles.azimuth, fromHeroAngles.elevation, meters(50), bullets);
    });

    physicsLoopService.shouldAutoUpdate(true);

    keyboardService.onKey(KeysExtra.Space).pressed$.subscribe((): void => physicsLoopService.shouldAutoUpdate(!physicsLoopService.isAutoUpdate()));
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
