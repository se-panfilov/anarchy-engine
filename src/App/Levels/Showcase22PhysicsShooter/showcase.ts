import type { Intersection } from 'three';
import { Box3, Vector3 } from 'three';
import type { Line2 } from 'three/examples/jsm/lines/Line2';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActorWrapperAsync, TActorWrapperWithPhysicsAsync, TAppCanvas, TCameraWrapper, TEngine, TIntersectionEvent, TIntersectionsWatcher, TSpace, TSpaceConfig, TWithCoordsXYZ } from '@/Engine';
import { buildSpaceFromConfig, Engine, get3DAzimuth, isDefined, isNotDefined, KeysExtra, mouseService } from '@/Engine';

import spaceConfig from './showcase.json';
import type { TBullet } from './utils';
import { buildTower, cameraFollowingActor, createLine, getBulletsPool, initGridHelper, shoot, startMoveActorWithKeyboard, updateBullets } from './utils';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const { physicsLoopService, cameraService, actorService, loopService, intersectionsWatcherService } = space.services;

  async function init(): Promise<void> {
    // physicsWorldService.getDebugRenderer(loopService).start();
    physicsLoopService.shouldAutoUpdate(false);

    const cameraW: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(cameraW)) throw new Error(`Cannot find active camera`);

    const heroW: TActorWrapperWithPhysicsAsync | TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('hero');
    if (isNotDefined(heroW)) throw new Error(`Cannot find "hero" actor`);

    const surface: TActorWrapperWithPhysicsAsync | TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('surface');
    if (isNotDefined(surface)) throw new Error(`Cannot find "surface" actor`);

    startMoveActorWithKeyboard(heroW, keyboardService);

    const gridSize: Vector3 = new Box3().setFromObject(surface?.entity).getSize(new Vector3());
    initGridHelper(actorService, gridSize.x, gridSize.z);

    const blocks = await buildTower(actorService, { x: 0, z: 0 }, 10, 10, 20);
    // const blocks2 = await buildTower(actorService, { x: 20, z: 0 }, 5, 5, 15);
    // await buildTower(actorService, { x: 0, z: 30 }, 6, 7, 18);
    // await buildTower(actorService, { x: 17, z: 30 }, 7, 7, 35);
    // await buildTower(actorService, { x: -15, z: -15 }, 10, 7, 15);

    // TODO (S.Panfilov) temp
    const maxBulletsSameTime: number = 5;
    const bullets: ReadonlyArray<TBullet> = await Promise.all(getBulletsPool(maxBulletsSameTime, actorService));
    actorService.getScene().entity.add(...bullets.map((b: TBullet) => b.entity));

    const mouseLineIntersectionsWatcher: TIntersectionsWatcher = intersectionsWatcherService.create({
      name: 'mouse_line_intersections_watcher',
      isAutoStart: true,
      camera: cameraW,
      actors: [...blocks, surface],
      position$: mouseService.position$,
      tags: []
    });

    let mouseLineIntersections: TIntersectionEvent = { point: new Vector3(), distance: 0 } as Intersection;
    mouseLineIntersectionsWatcher.value$.subscribe((intersection: TIntersectionEvent): void => void (mouseLineIntersections = intersection));

    const line: Line2 = createLine();
    actorService.getScene().entity.add(line);

    let fromHeroAngles: Readonly<{ azimuth: number; elevation: number }> = {
      azimuth: 0,
      elevation: 0
    };

    loopService.tick$.subscribe((delta) => {
      cameraFollowingActor(cameraW, heroW);
      updateBullets(bullets, delta.delta);

      // TODO (S.Panfilov) this should be updated only if coords or angle are changed
      if (isDefined(mouseLineIntersections.point)) {
        const heroCoords: TWithCoordsXYZ = heroW.getPosition().getCoords();
        fromHeroAngles = get3DAzimuth(heroCoords, mouseLineIntersections.point);
        // TODO (S.Panfilov) could make some use of mouseLineIntersectionsWatcher.latest$ instead of mouseLineIntersections
        line.geometry.setPositions([heroCoords.x, heroCoords.y, heroCoords.z, mouseLineIntersections.point.x, mouseLineIntersections.point.y, mouseLineIntersections.point.z]);
        line.computeLineDistances();
      }
    });

    mouseService.clickLeftRelease$.subscribe((): void => {
      if (isNotDefined(heroW)) throw new Error(`Cannot find "hero" actor`);
      shoot(heroW.getPosition().getCoords(), fromHeroAngles.azimuth, fromHeroAngles.elevation, 10, bullets);
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
