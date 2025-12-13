import type {
  TActor,
  TAnyCameraWrapper,
  TCollisionCheckResult,
  TIntersectionEvent,
  TIntersectionsCameraWatcher,
  TMetersPerSecond,
  TMilliseconds,
  TRawModel3d,
  TReadonlyVector3,
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TSpatialGridWrapper
} from '@Anarchy/Engine';
import { KeyCode, metersPerSecond, milliseconds, onKey, spaceService } from '@Anarchy/Engine';
import { radians } from '@Anarchy/Engine/Measurements/Utils';
import { asRecord, isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import type { Intersection } from 'three';
import { Vector3 } from 'three';
import type { Line2 } from 'three/examples/jsm/lines/Line2';
import { degToRad } from 'three/src/math/MathUtils';

import { enableCollisions } from '@/Levels/Showcase20PhysicsShooter/utils/Collisions';
import { initLight } from '@/Levels/Showcase20PhysicsShooter/utils/Light';
import type { TAppSettings } from '@/Models';
import { enableFPSCounter } from '@/Utils';

import spaceConfigJson from './space.json';
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
  prepareShooting,
  startMoveActorWithKeyboard,
  updateBullets
} from './utils';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);
  if (settings.loopsDebugInfo) enableFPSCounter(space.loops.renderLoop.tick$);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const {
    cameraService,
    physicsWorldService,
    physicsBodyService,
    actorService,
    lightService,
    keyboardService,
    models3dService,
    materialService,
    mouseService,
    intersectionsWatcherService,
    spatialGridService
  } = space.services;
  const { physicsLoop, transformLoop, intersectionsLoop } = space.loops;

  physicsWorldService.getDebugRenderer(physicsLoop).start();

  // (window as any).space = space;

  initLight(lightService);

  const cameraW: TAnyCameraWrapper = cameraService.getActive();
  const hero: TActor = actorService.getRegistry().getByName('hero');
  const surface: TActor = actorService.getRegistry().getByName('surface');
  const sphereActor: TActor = actorService.getRegistry().getByName('sphere');
  const spatialGrid: TSpatialGridWrapper = spatialGridService.getRegistry().getByName('main_grid');

  // const blocks: ReadonlyArray<TActor> = buildTower(actorService, models3dService, materialService, physicsBodyService, { x: 10, z: 0 }, 5, 5, 10, spatialGrid);
  const blocks: ReadonlyArray<TActor> = buildTower(
    actorService,
    models3dService,
    materialService,
    physicsBodyService,
    {
      x: 10,
      z: 0
    },
    10,
    10,
    20,
    spatialGrid
  );
  const blocks2: ReadonlyArray<TActor> = buildTower(
    actorService,
    models3dService,
    materialService,
    physicsBodyService,
    {
      x: 45,
      z: 7
    },
    6,
    7,
    18,
    spatialGrid
  );
  const blocks3: ReadonlyArray<TActor> = buildTower(
    actorService,
    models3dService,
    materialService,
    physicsBodyService,
    {
      x: -15,
      z: -15
    },
    10,
    7,
    15,
    spatialGrid
  );

  const maxBulletsSameTime: number = 150;
  const bullets: ReadonlyArray<TBullet> = getBulletsPool(maxBulletsSameTime, actorService, models3dService, materialService, spatialGridService);
  const sceneW: TSceneWrapper = actorService.getScene();
  sceneW.entity.add(...bullets.map((b: TBullet): TRawModel3d => b.model3d.getRawModel3d()));
  bullets.forEach((b: TBullet): void => {
    b.hit$.subscribe((hit: TCollisionCheckResult): void => {
      console.log('hit');
      createHitEffect(hit.collisionPoint, sceneW, lightService);
      applyExplosionImpulse(hit.object, hit.collisionPoint, 1000);
    });
  });

  const mouseLineIntersectionsWatcher: TIntersectionsCameraWatcher = intersectionsWatcherService.create({
    name: 'mouse_line_intersections_watcher',
    isAutoStart: true,
    camera: cameraW,
    actors: [...blocks, ...blocks2, ...blocks3, surface, sphereActor],
    position$: mouseService.normalizedPosition$,
    intersectionsLoop
  }) as TIntersectionsCameraWatcher;

  startMoveActorWithKeyboard(hero, keyboardService, mouseLineIntersectionsWatcher);

  enableCollisions(mouseLineIntersectionsWatcher, space.services);

  let mouseLineIntersections: TIntersectionEvent = { point: new Vector3(), distance: 0 } as Intersection;
  mouseLineIntersectionsWatcher.value$.subscribe((intersection: TIntersectionEvent): void => void (mouseLineIntersections = intersection));

  const line: Line2 = createLine('#E91E63', 0.1);
  actorService.getScene().entity.add(line);

  //move bouncing sphere to target practice
  moveActorBounce(sphereActor, metersPerSecond(4.3), radians(degToRad(210)), milliseconds(5000));

  const targetActor1: TActor = actorService.getRegistry().getByName('target_1');
  const targetActor2: TActor = actorService.getRegistry().getByName('target_2');
  const targetActor3: TActor = actorService.getRegistry().getByName('target_3');

  moveActorBounce(targetActor1, metersPerSecond(4), radians(degToRad(-270)), milliseconds(3000));
  // TODO setTimeout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
  setTimeout(() => moveActorBounce(targetActor2, metersPerSecond(4.5), radians(degToRad(-270)), milliseconds(3000)), 500);
  // TODO setTimeout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
  setTimeout(() => moveActorBounce(targetActor3, metersPerSecond(5), radians(degToRad(-270)), milliseconds(3000)), 1000);

  const shootingParams = {
    cooldownMs: 300,
    speed: 30 as TMetersPerSecond
  };

  initGui(mouseLineIntersectionsWatcher, spatialGridService, actorService, shootingParams);

  cameraFollowingActor(cameraW, hero);

  transformLoop.tick$.subscribe((delta: TMilliseconds): void => {
    updateBullets(bullets, delta);
    // TODO this should be updated only if coords or angle are changed
    if (isDefined(mouseLineIntersections?.point)) {
      const heroCoords: TReadonlyVector3 = hero.drive.position$.value;
      // TODO could make some use of mouseLineIntersectionsWatcher.latest$ instead of mouseLineIntersections
      line.geometry.setPositions([heroCoords.x, heroCoords.y, heroCoords.z, mouseLineIntersections.point.x, mouseLineIntersections.point.y, mouseLineIntersections.point.z]);
      line.computeLineDistances();
    }
  });

  prepareShooting(hero, mouseService, mouseLineIntersectionsWatcher, shootingParams, bullets);
  keyboardService.keys$.pipe(onKey(KeyCode.Space)).subscribe((): void => physicsLoop.enabled$.next(!physicsLoop.enabled$.value));

  space.start$.next(true);
}
