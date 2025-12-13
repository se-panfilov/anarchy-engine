import type { Intersection } from 'three';
import { Vector3 } from 'three';
import type { Line2 } from 'three/examples/jsm/lines/Line2';
import { degToRad } from 'three/src/math/MathUtils';

import type { TShowcase } from '@/App/Levels/Models';
import { enableCollisions } from '@/App/Levels/Showcase22PhysicsShooter/utils/Collisions';
import { initLight } from '@/App/Levels/Showcase22PhysicsShooter/utils/Light';
import { getMemoryUsage } from '@/App/Levels/Utils';
import type {
  TActor,
  TAppCanvas,
  TCameraWrapper,
  TCollisionCheckResult,
  TEngine,
  TIntersectionEvent,
  TIntersectionsWatcher,
  TRadians,
  TRawModel3d,
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TSpatialGridWrapper
} from '@/Engine';
import { Engine, get3DAzimuth, isDefined, isNotDefined, KeysExtra, metersPerSecond, milliseconds, secondsToMS, spaceService } from '@/Engine';
import { radians } from '@/Engine/Measurements/Utils';

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
  shootRapidFire,
  startMoveActorWithKeyboard,
  updateBullets
} from './utils';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const {
    physicsLoopService,
    cameraService,
    physicsWorldService,
    actorService,
    lightService,
    loopService,
    models3dService,
    materialService,
    mouseService,
    intersectionsWatcherService,
    spatialGridService
  } = space.services;

  async function init(): Promise<void> {
    physicsWorldService.getDebugRenderer(loopService).start();
    physicsLoopService.autoUpdate$.next(false);

    // (window as any).space = space;

    initLight(lightService);

    const cameraW: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(cameraW)) throw new Error(`Cannot find active camera`);

    const hero: TActor | undefined = actorService.getRegistry().findByName('hero');
    if (isNotDefined(hero)) throw new Error(`Cannot find "hero" actor`);

    const surface: TActor | undefined = actorService.getRegistry().findByName('surface');
    if (isNotDefined(surface)) throw new Error(`Cannot find "surface" actor`);

    const sphereActor: TActor | undefined = actorService.getRegistry().findByName('sphere');
    if (isNotDefined(sphereActor)) throw new Error(`Cannot find "sphere" actor`);

    const spatialGrid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');
    if (isNotDefined(spatialGrid)) throw new Error(`Cannot find "main_grid" spatial grid`);

    // const blocks = await buildTower(actorService, models3dService, materialService, { x: 10, z: 0 }, 5, 5, 10, spatialGrid);
    const blocks = await buildTower(actorService, models3dService, materialService, { x: 10, z: 0 }, 10, 10, 20, spatialGrid);
    const blocks2 = await buildTower(actorService, models3dService, materialService, { x: 45, z: 7 }, 6, 7, 18, spatialGrid);
    const blocks3 = await buildTower(actorService, models3dService, materialService, { x: -15, z: -15 }, 10, 7, 15, spatialGrid);

    const maxBulletsSameTime: number = 150;
    const bullets: ReadonlyArray<TBullet> = await Promise.all(getBulletsPool(maxBulletsSameTime, actorService, models3dService, materialService, spatialGridService));
    const sceneW: TSceneWrapper = actorService.getScene();
    sceneW.entity.add(...bullets.map((b: TBullet): TRawModel3d => b.model3d.getRawModel3d()));
    bullets.forEach((b: TBullet): void => {
      b.hit$.subscribe((hit: TCollisionCheckResult): void => {
        console.log('hit');
        createHitEffect(hit.collisionPoint, sceneW, lightService);
        applyExplosionImpulse(hit.object, hit.collisionPoint, 1000);
      });
    });

    const mouseLineIntersectionsWatcher: TIntersectionsWatcher = intersectionsWatcherService.create({
      name: 'mouse_line_intersections_watcher',
      isAutoStart: true,
      camera: cameraW,
      actors: [...blocks, ...blocks2, ...blocks3, surface, sphereActor],
      position$: mouseService.position$
    });

    startMoveActorWithKeyboard(hero, keyboardService, mouseLineIntersectionsWatcher);

    enableCollisions(mouseLineIntersectionsWatcher, space.services);

    let mouseLineIntersections: TIntersectionEvent = { point: new Vector3(), distance: 0 } as Intersection;
    mouseLineIntersectionsWatcher.value$.subscribe((intersection: TIntersectionEvent): void => void (mouseLineIntersections = intersection));

    const line: Line2 = createLine('#E91E63', 0.1);
    actorService.getScene().entity.add(line);

    const fromHeroAngles: { azimuth: TRadians; elevation: TRadians } = {
      azimuth: radians(0),
      elevation: radians(0)
    };

    //move bouncing sphere to target practice
    moveActorBounce(sphereActor, metersPerSecond(4.3), radians(degToRad(210)), milliseconds(5000));

    const targetActor1: TActor | undefined = actorService.getRegistry().findByName('target_1');
    if (isNotDefined(targetActor1)) throw new Error(`Cannot find "target_1" actor`);
    const targetActor2: TActor | undefined = actorService.getRegistry().findByName('target_2');
    if (isNotDefined(targetActor2)) throw new Error(`Cannot find "target_2" actor`);
    const targetActor3: TActor | undefined = actorService.getRegistry().findByName('target_3');
    if (isNotDefined(targetActor3)) throw new Error(`Cannot find "target_3" actor`);

    // TODO CWP refactor objects creation (do not add to a registry immediately, cause in that case if we extend, there will be unextetended version in the registy)
    moveActorBounce(targetActor1, metersPerSecond(4), radians(degToRad(-270)), milliseconds(3000));
    // TODO setTimout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
    setTimeout(() => moveActorBounce(targetActor2, metersPerSecond(4.5), radians(degToRad(-270)), milliseconds(3000)), 500);
    // TODO setTimout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
    setTimeout(() => moveActorBounce(targetActor3, metersPerSecond(5), radians(degToRad(-270)), milliseconds(3000)), 1000);

    const shootingParams = {
      cooldownMs: 300,
      speed: 30
    };

    initGui(mouseLineIntersectionsWatcher, spatialGridService, actorService, shootingParams);

    cameraFollowingActor(cameraW, hero);

    loopService.tick$.subscribe((delta): void => {
      updateBullets(bullets, delta.delta, spatialGrid);
      // TODO this should be updated only if coords or angle are changed
      if (isDefined(mouseLineIntersections.point)) {
        const heroCoords: Vector3 = hero.drive.getPosition();
        const azimuth3d = get3DAzimuth(heroCoords, mouseLineIntersections.point);
        // eslint-disable-next-line functional/immutable-data
        fromHeroAngles.azimuth = azimuth3d.azimuth;
        // eslint-disable-next-line functional/immutable-data
        fromHeroAngles.elevation = (azimuth3d.elevation as number) >= 0 ? azimuth3d.elevation : radians(0);
        // TODO could make some use of mouseLineIntersectionsWatcher.latest$ instead of mouseLineIntersections
        line.geometry.setPositions([heroCoords.x, heroCoords.y, heroCoords.z, mouseLineIntersections.point.x, mouseLineIntersections.point.y, mouseLineIntersections.point.z]);
        line.computeLineDistances();
      }
    });

    shootRapidFire(hero, mouseService, fromHeroAngles, shootingParams, bullets);

    physicsLoopService.autoUpdate$.next(true);
    keyboardService.onKey(KeysExtra.Space).pressed$.subscribe((): void => physicsLoopService.autoUpdate$.next(!physicsLoopService.autoUpdate$.value));
  }

  function start(): void {
    engine.start();
    void init();
    console.log('Memory usage:', getMemoryUsage());
  }

  return { start, space };
}
