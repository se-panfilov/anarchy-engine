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
import { buildTower, cameraFollowingActor, createLine, getBulletsPool, initGui, moveActorBounce, shoot, startMoveActorWithKeyboard, updateBullets } from './utils';

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

    // const gridSize: Vector3 = new Box3().setFromObject(surface?.entity).getSize(new Vector3());
    // initGridHelper(actorService, gridSize.x, gridSize.z);

    const blocks = await buildTower(actorService, { x: 10, z: 0 }, 10, 10, 20);
    // const blocks2 = await buildTower(actorService, { x: 20, z: 0 }, 5, 5, 15);
    // await buildTower(actorService, { x: 0, z: 30 }, 6, 7, 18);
    // await buildTower(actorService, { x: 17, z: 30 }, 7, 7, 35);
    // await buildTower(actorService, { x: -15, z: -15 }, 10, 7, 15);

    // TODO (S.Panfilov) temp
    const maxBulletsSameTime: number = 15;
    const bullets: ReadonlyArray<TBullet> = await Promise.all(getBulletsPool(maxBulletsSameTime, actorService, spatialGridService));
    actorService.getScene().entity.add(...bullets.map((b: TBullet) => b.entity));

    const mouseLineIntersectionsWatcher: TIntersectionsWatcher = intersectionsWatcherService.create({
      name: 'mouse_line_intersections_watcher',
      isAutoStart: true,
      camera: cameraW,
      actors: [...blocks, surface, sphereActorW],
      position$: mouseService.position$,
      tags: []
    });

    startMoveActorWithKeyboard(heroW, keyboardService, mouseLineIntersectionsWatcher);

    await enableCollisions(actorService.getScene(), actorService, mouseLineIntersectionsWatcher, spatialGridService);

    let mouseLineIntersections: TIntersectionEvent = { point: new Vector3(), distance: 0 } as Intersection;
    mouseLineIntersectionsWatcher.value$.subscribe((intersection: TIntersectionEvent): void => void (mouseLineIntersections = intersection));

    const line: Line2 = createLine('#E91E63', 0.1);
    actorService.getScene().entity.add(line);

    let fromHeroAngles: Readonly<{ azimuth: TRadians; elevation: TRadians }> = {
      azimuth: 0,
      elevation: 0
    };

    //move bouncing sphere to target practice
    moveActorBounce(sphereActorW);

    const spatialGrid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');
    if (isNotDefined(spatialGrid)) throw new Error(`Cannot find "main_grid" spatial grid`);
    initGui(mouseLineIntersectionsWatcher, spatialGridService, actorService);

    loopService.tick$.subscribe((delta): void => {
      cameraFollowingActor(cameraW, heroW);
      updateBullets(bullets, delta.delta, spatialGrid);

      // TODO (S.Panfilov) this should be updated only if coords or angle are changed
      if (isDefined(mouseLineIntersections.point)) {
        const heroCoords: TWithCoordsXYZ = heroW.getPosition().getCoords();
        fromHeroAngles = get3DAzimuthRad(heroCoords, mouseLineIntersections.point);
        // TODO (S.Panfilov) could make some use of mouseLineIntersectionsWatcher.latest$ instead of mouseLineIntersections
        line.geometry.setPositions([heroCoords.x, heroCoords.y, heroCoords.z, mouseLineIntersections.point.x, mouseLineIntersections.point.y, mouseLineIntersections.point.z]);
        line.computeLineDistances();
      }
    });

    mouseService.clickLeftRelease$.subscribe((): void => {
      if (isNotDefined(heroW)) throw new Error(`Cannot find "hero" actor`);
      shoot(heroW.getPosition().getCoords(), fromHeroAngles.azimuth, fromHeroAngles.elevation, meters(1), bullets);
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
