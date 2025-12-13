import { GridHelper, Plane, Raycaster, Vector2, Vector3 } from 'three';
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
  getPushCoordsFrom3dAzimuth,
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
  const { onKey } = keyboardService;

  async function init(): Promise<void> {
    // physicsWorldService.getDebugRenderer(loopService).start();
    physicsLoopService.shouldAutoUpdate(false);

    const cameraW: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(cameraW)) throw new Error(`Cannot find active camera`);

    const heroW: TActorWrapperWithPhysicsAsync | TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('hero');
    if (isNotDefined(heroW)) throw new Error(`Cannot find "hero" actor`);

    onKey(KeyCode.W).pressing$.subscribe(({ delta }): void => void heroW.addZ(mpsSpeed(-10, delta.delta)));
    onKey(KeyCode.A).pressing$.subscribe(({ delta }): void => void heroW.addX(mpsSpeed(-10, delta.delta)));
    onKey(KeyCode.S).pressing$.subscribe(({ delta }): void => void heroW.addZ(mpsSpeed(10, delta.delta)));
    onKey(KeyCode.D).pressing$.subscribe(({ delta }): void => void heroW.addX(mpsSpeed(10, delta.delta)));

    const sceneWrapper: TSceneWrapper = actorService.getScene();

    //helper grid
    const size: number = 200;
    const divisions: number = 200;
    const gridHelper: GridHelper = new GridHelper(size, divisions);
    sceneWrapper.entity.add(gridHelper);

    const blocks = await buildTower(actorService, 10, 10, 20);

    let mouseLineIntersectionsCoords: Vector3 | undefined = undefined;

    const mouse = new Vector2();
    const raycaster = new Raycaster();
    const plane = new Plane(new Vector3(0, 1, 0), 0); // XZ plane
    const planeNormal = new Vector3(0, 1, 0); // Normal vector of the XZ plane

    let angle = 0;

    mouseService.position$.subscribe(({ coords }): void => {
      // Convert mouse coordinates to normalized device coordinates (-1 to +1)
      mouse.x = (coords.x / window.innerWidth) * 2 - 1;
      mouse.y = -(coords.y / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, (cameraService.findActive() as TCameraWrapper)?.entity);

      const intersects = raycaster.ray.intersectPlane(plane, new Vector3());
      if (intersects) {
        const point = intersects;
        angle = planeNormal.angleTo(raycaster.ray.direction);
        const distance = point.distanceTo(heroW.getPosition().getCoords());
        mouseLineIntersectionsCoords = new Vector3(point.x, 2, point.z);
      }
    });

    const line: Line2 = createLine();
    sceneWrapper.entity.add(line);

    loopService.tick$.subscribe(() => {
      // cameraFollowingActor(cameraW, heroW);

      if (isDefined(mouseLineIntersectionsCoords)) {
        const heroCoords: TWithCoordsXYZ = heroW.getPosition().getCoords();
        line.geometry.setPositions([heroCoords.x, heroCoords.y, heroCoords.z, mouseLineIntersectionsCoords.x, mouseLineIntersectionsCoords.y, mouseLineIntersectionsCoords.z]);
        line.computeLineDistances();
      }
    });

    mouseService.clickLeftRelease$.subscribe(() => {
      if (isNotDefined(heroW)) throw new Error(`Cannot find "hero" actor`);
      heroW.physicsBody?.getRigidBody()?.applyImpulse(getPushCoordsFrom3dAzimuth(angle, 2, 100), true);
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

function cameraFollowingActor(cameraW: TCameraWrapper, actorW: TActorWrapperAsync): void {
  // const actorCoords: TWithCoordsXYZ = actorW.getPosition().getCoords();
  // cameraW.setPosition(Vector3Wrapper({ x: actorCoords.x, y: actorCoords.y + 10, z: actorCoords.z + 10 }));
  // cameraW.lookAt(Vector3Wrapper(actorCoords));
}
