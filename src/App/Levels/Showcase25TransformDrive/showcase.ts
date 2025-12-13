import GUI from 'lil-gui';
import { Euler, Vector3 } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type {
  TActor,
  TAppCanvas,
  TCameraWrapper,
  TEngine,
  TIntersectionEvent,
  TIntersectionsWatcher,
  TMaterialWrapper,
  TModel3d,
  TModel3dRegistry,
  TransformAgent,
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TSpatialGridWrapper
} from '@/Engine';
import { Engine, isNotDefined, MaterialType, PrimitiveModel3dType, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const gui: GUI = new GUI();
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  const { actorService, cameraService, intersectionsWatcherService, materialService, models3dService, mouseService, scenesService, spatialGridService } = space.services;
  const models3dRegistry: TModel3dRegistry = models3dService.getRegistry();

  function init(): void {
    const sceneW: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(sceneW)) throw new Error('Scene is not defined');

    const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');
    if (isNotDefined(grid)) throw new Error('Grid is not defined');

    const planeModel3dF: TModel3d | undefined = models3dRegistry.findByName('surface_model');
    if (isNotDefined(planeModel3dF)) throw new Error('Plane model is not defined');

    sceneW.addModel3d(planeModel3dF);

    const sphereMaterial: TMaterialWrapper = materialService.create({ name: 'surface_material', type: MaterialType.Standard, options: { color: '#E91E63' } });

    const sphereModel: TModel3d = models3dService.create({
      name: 'sphere_model',
      model3dSource: PrimitiveModel3dType.Sphere,
      materialSource: sphereMaterial,
      options: { radius: 0.7 },
      castShadow: true,
      receiveShadow: true,
      position: new Vector3(0, 2, 0),
      rotation: new Euler(0, 0, 0)
    });

    const sphereActor: TActor = actorService.create({
      name: 'sphere_actor',
      model3dSource: sphereModel,
      position: new Vector3(0, 2, 0),
      rotation: new Euler(0, 0, 0),
      spatial: { grid, isAutoUpdate: true }
    });

    sphereActor.drive.agent$.subscribe((agent: TransformAgent): void => {
      // TODO output to GUI
      console.log('sphereActor agent', agent);
    });

    const guiDriveObj = { drive: sphereActor.drive.agent$.value, a: 'Small' };
    const proxyGuiDriveObj = new Proxy(guiDriveObj, {
      set: (target: Record<string, unknown>, prop: string, value: TransformAgent): boolean => {
        // eslint-disable-next-line functional/immutable-data
        target.drive = value;
        if (prop === 'drive') {
          sphereActor.drive.agent$.next(value);
        }
        return true;
      }
    });

    // gui.add(proxyGuiDriveObj, 'a', ['Small', 'Medium', 'Large']);
    // gui.add(proxyGuiDriveObj, 'drive', Object.values(TransformAgent));

    // TODO intersections with plane actor
    // watchIntersections([sphereActor]);

    // TODO implement 1,2,3,4 to switch between agents (kinematic, physics, instant set, instant connector)
  }

  function watchIntersections(actors: ReadonlyArray<TActor>): TIntersectionsWatcher {
    const camera: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(camera)) throw new Error('Camera is not defined');

    const intersectionsWatcher: TIntersectionsWatcher = intersectionsWatcherService.create({ camera, actors, position$: mouseService.position$, isAutoStart: true });

    intersectionsWatcher.value$.subscribe((obj: TIntersectionEvent): void => console.log('intersect obj', obj));
    mouseService.clickLeftRelease$.subscribe((): void => console.log('int click:'));

    return intersectionsWatcher.start();
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
