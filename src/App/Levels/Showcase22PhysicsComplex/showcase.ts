import type { Vector3 } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

import type { TShowcase } from '@/App/Levels/Models';
import type {
  TActorParams,
  TActorService,
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
  ActorType,
  buildSpaceFromConfig,
  CollisionShape,
  Engine,
  get3DAzimuth,
  getPushCoordsFrom3dAzimuth,
  isDefined,
  isNotDefined,
  KeysExtra,
  MaterialType,
  mouseService,
  RigidBodyTypesNames,
  Vector3Wrapper
} from '@/Engine';
import { meters } from '@/Engine/Measurements/Utils';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const { physicsLoopService, cameraService, actorService, loopService, controlsService, intersectionsWatcherService } = space.services;

  async function init(): Promise<void> {
    // physicsWorldService.getDebugRenderer(loopService).start();
    physicsLoopService.shouldAutoUpdate(false);

    controlsService.findActive()?.entity.target.set(0, 10, 0);
    const cameraW: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(cameraW)) throw new Error(`Cannot find active camera`);

    const ballActorW: TActorWrapperWithPhysicsAsync | TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('ball');
    if (isNotDefined(ballActorW)) throw new Error(`Cannot find "ball" actor`);

    const sceneWrapper: TSceneWrapper = actorService.getScene();

    const blocks = await buildTower(actorService, 10, 10, 20);

    const mouseLineIntersectionsWatcher: TIntersectionsWatcher = intersectionsWatcherService.create({
      name: 'mouse_line_intersections_watcher',
      isAutoStart: true,
      camera: cameraW,
      actors: blocks,
      position$: mouseService.position$,
      tags: []
    });

    let mouseLineIntersectionsCoords: Vector3 | undefined = undefined;
    mouseLineIntersectionsWatcher.value$.subscribe((intersection: TIntersectionEvent) => {
      mouseLineIntersectionsCoords = intersection.point;
    });

    const line: Line2 = createLine();
    sceneWrapper.entity.add(line);

    let coords: Readonly<{ azimuth: number; elevation: number }> = {
      azimuth: 0,
      elevation: 0
    };

    loopService.tick$.subscribe(() => {
      if (isDefined(mouseLineIntersectionsCoords)) {
        const ballCoords: TWithCoordsXYZ = ballActorW.getPosition().getCoords();
        coords = get3DAzimuth(ballCoords, mouseLineIntersectionsCoords);
        line.geometry.setPositions([ballCoords.x, ballCoords.y, ballCoords.z, mouseLineIntersectionsCoords.x, mouseLineIntersectionsCoords.y, mouseLineIntersectionsCoords.z]);
        line.computeLineDistances();
      }
    });

    mouseService.clickLeftRelease$.subscribe(() => {
      if (isNotDefined(ballActorW)) throw new Error(`Cannot find "ball" actor`);
      ballActorW.physicsBody?.getRigidBody()?.applyImpulse(getPushCoordsFrom3dAzimuth(coords.azimuth, coords.elevation, 100), true);
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

async function buildTower(actorService: TActorService, rows: number, cols: number, levels: number): Promise<ReadonlyArray<TActorWrapperWithPhysicsAsync>> {
  const blocks: ReadonlyArray<Required<Pick<TActorParams, 'height' | 'width' | 'depth' | 'position'>>> = getBlocks(rows, cols, levels);

  console.log('number of blocks:', blocks.length);

  const result = blocks.map((block: Required<Pick<TActorParams, 'height' | 'width' | 'depth' | 'position'>>): Promise<TActorWrapperWithPhysicsAsync> => {
    return actorService.createAsync({
      // name: `block-${i}-${j}`,
      type: ActorType.Cube,
      width: block.width,
      height: block.height,
      depth: block.depth,
      material: { type: MaterialType.Standard, params: { color: '#8FAA8F' } },
      physics: {
        type: RigidBodyTypesNames.Dynamic,
        collisionShape: CollisionShape.Cuboid,
        mass: 1,
        friction: 0.5,
        restitution: 0,
        shapeParams: {
          hx: block.width / 2,
          hy: block.height / 2,
          hz: block.depth / 2
        },
        position: block.position
      },
      position: block.position,
      castShadow: true,
      tags: []
    }) as Promise<TActorWrapperWithPhysicsAsync>;
  });

  return await Promise.all(result);
}

function getBlocks(rows: number, cols: number, levels: number): ReadonlyArray<Required<Pick<TActorParams, 'height' | 'width' | 'depth' | 'position'>>> {
  let blocks: ReadonlyArray<Required<Pick<TActorParams, 'height' | 'width' | 'depth' | 'position'>>> = [];
  const gap: number = 0.1;
  const width: number = 1;
  const height: number = 1;
  const depth: number = 1;

  // eslint-disable-next-line functional/no-loop-statements
  for (let i: number = 0; i < rows; i++) {
    // eslint-disable-next-line functional/no-loop-statements
    for (let j: number = 0; j < cols; j++) {
      // eslint-disable-next-line functional/no-loop-statements
      for (let k: number = 0; k < levels; k++) {
        blocks = [
          ...blocks,
          {
            width,
            height,
            depth,
            position: Vector3Wrapper({
              x: i * (width + gap),
              y: k * (height + gap / 4),
              z: j * (depth + gap)
            })
          }
        ];
      }
    }
  }

  return blocks;
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
