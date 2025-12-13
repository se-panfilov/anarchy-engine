import { Box3, GridHelper, Plane, Raycaster, Vector2, Vector3 } from 'three';
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
  TGameKey,
  TKeySubscription,
  TSpace,
  TSpaceConfig,
  TWithCoordsXY,
  TWithCoordsXYZ,
  TWithCoordsXZ
} from '@/Engine';
import {
  ActorType,
  buildSpaceFromConfig,
  CollisionShape,
  Engine,
  isDefined,
  isNotDefined,
  KeyCode,
  KeysExtra,
  MaterialType,
  mouseService,
  mpsSpeed,
  RigidBodyTypesNames,
  Vector3Wrapper
} from '@/Engine';
import { meters } from '@/Engine/Measurements/Utils';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const { physicsLoopService, cameraService, controlsService, actorService, loopService, intersectionsWatcherService } = space.services;

  async function init(): Promise<void> {
    // physicsWorldService.getDebugRenderer(loopService).start();
    physicsLoopService.shouldAutoUpdate(false);

    const cameraW: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(cameraW)) throw new Error(`Cannot find active camera`);

    const heroW: TActorWrapperWithPhysicsAsync | TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('hero');
    if (isNotDefined(heroW)) throw new Error(`Cannot find "hero" actor`);

    const surface: TActorWrapperWithPhysicsAsync | TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('surface');
    if (isNotDefined(surface)) throw new Error(`Cannot find "surface" actor`);

    startMoveActorWithKeyboard(heroW, keyboardService.onKey);

    const gridSize: Vector3 = new Box3().setFromObject(surface?.entity).getSize(new Vector3());
    initGridHelper(actorService, gridSize.x, gridSize.z);

    await buildTower(actorService, { x: 0, z: 0 }, 10, 10, 20);
    // await buildTower(actorService, { x: 20, z: 0 }, 5, 5, 15);
    // await buildTower(actorService, { x: 0, z: 30 }, 6, 7, 18);
    // await buildTower(actorService, { x: 17, z: 30 }, 7, 7, 35);
    // await buildTower(actorService, { x: -15, z: -15 }, 10, 7, 15);

    const raycaster: Raycaster = new Raycaster();
    const plane: Plane = new Plane(new Vector3(0, 1, 0), 0); // XZ plane
    const planeNormal: Vector3 = new Vector3(0, 1, 0); // Normal vector of the XZ plane

    let heroADC: THeroADC = {
      angle: 0,
      distance: 0,
      coords: undefined
    };

    mouseService.position$.subscribe(({ normalizedCoords }): void => {
      heroADC = getADCFromActor(heroW, normalizedCoords, raycaster, cameraW, plane, planeNormal);
    });

    const line: Line2 = createLine();
    actorService.getScene().entity.add(line);

    loopService.tick$.subscribe(() => {
      // cameraFollowingActor(cameraW, heroW);

      if (isDefined(heroADC.coords)) {
        const heroCoords: TWithCoordsXYZ = heroW.getPosition().getCoords();
        line.geometry.setPositions([heroCoords.x, heroCoords.y, heroCoords.z, heroADC.coords.x, heroADC.coords.y, heroADC.coords.z]);
        line.computeLineDistances();
      }
    });

    mouseService.clickLeftRelease$.subscribe((): void => {
      if (isNotDefined(heroW)) throw new Error(`Cannot find "hero" actor`);
      // heroW.physicsBody?.getRigidBody()?.applyImpulse(getPushCoordsFrom3dAzimuth(heroADC.angle, 2, 100), true);
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

async function buildTower(actorService: TActorService, startCoords: TWithCoordsXZ, rows: number, cols: number, levels: number): Promise<ReadonlyArray<TActorWrapperWithPhysicsAsync>> {
  const blocks: ReadonlyArray<Required<Pick<TActorParams, 'height' | 'width' | 'depth' | 'position'>>> = getBlocks(startCoords, rows, cols, levels);

  console.log('number of blocks:', blocks.length);

  const result = blocks.map((block: Required<Pick<TActorParams, 'height' | 'width' | 'depth' | 'position'>>): Promise<TActorWrapperWithPhysicsAsync> => {
    return actorService.createAsync({
      name: `block_${block.position.getX()}_${block.position.getY()}_${block.position.getZ()}`,
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

function getBlocks(startCoords: TWithCoordsXZ, rows: number, cols: number, levels: number): ReadonlyArray<Required<Pick<TActorParams, 'height' | 'width' | 'depth' | 'position'>>> {
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
              x: startCoords.x + i * (width + gap),
              y: k * (height + gap / 4),
              z: startCoords.z + j * (depth + gap)
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

function cameraFollowingActor(cameraW: TCameraWrapper, actorW: TActorWrapperAsync): void {
  const actorCoords: TWithCoordsXYZ = actorW.getPosition().getCoords();
  cameraW.setPosition(Vector3Wrapper({ x: actorCoords.x, y: actorCoords.y + 10, z: actorCoords.z + 10 }));
  cameraW.lookAt(Vector3Wrapper(actorCoords));
}

type THeroADC = Readonly<{ angle: number; distance: number; coords: Vector3 | undefined }>;

function getADCFromActor(actor: TActorWrapperAsync, normalizedCoords: TWithCoordsXY, raycaster: Raycaster, cameraW: TCameraWrapper, plane: Plane, planeNormal: Vector3): THeroADC {
  raycaster.setFromCamera(new Vector2(normalizedCoords.x, normalizedCoords.y), cameraW.entity);
  let result = { angle: 0, distance: 0, coords: new Vector3() };

  const intersects: Vector3 | null = raycaster.ray.intersectPlane(plane, new Vector3());
  if (intersects) {
    const point: Vector3 = intersects;
    result = {
      angle: planeNormal.angleTo(raycaster.ray.direction),
      distance: point.distanceTo(actor.getPosition().getCoords()),
      coords: new Vector3(point.x, 2, point.z)
    };
  }

  return result;
}

function startMoveActorWithKeyboard(actor: TActorWrapperAsync, onKey: (key: TGameKey) => TKeySubscription): void {
  onKey(KeyCode.W).pressing$.subscribe(({ delta }): void => void actor.addZ(mpsSpeed(-10, delta.delta)));
  onKey(KeyCode.A).pressing$.subscribe(({ delta }): void => void actor.addX(mpsSpeed(-10, delta.delta)));
  onKey(KeyCode.S).pressing$.subscribe(({ delta }): void => void actor.addZ(mpsSpeed(10, delta.delta)));
  onKey(KeyCode.D).pressing$.subscribe(({ delta }): void => void actor.addX(mpsSpeed(10, delta.delta)));
}

function initGridHelper(actorService: TActorService, size: number, divisions: number): void {
  const gridHelper: GridHelper = new GridHelper(size, divisions, '#03A062', '#03A062');
  actorService.getScene().entity.add(gridHelper);
}
