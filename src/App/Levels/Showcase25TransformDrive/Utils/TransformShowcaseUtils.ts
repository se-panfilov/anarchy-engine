import type GUI from 'lil-gui';
import type { Subscription } from 'rxjs';
import { Euler, Vector3 } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

import type { KeyCode, KeysExtra, TActor, TCameraWrapper, TIntersectionsWatcher, TKeyboardService, TMaterialWrapper, TModel3d, TSpaceServices, TSpatialGridWrapper } from '@/Engine';
import { isNotDefined, MaterialType, PrimitiveModel3dType, TransformAgent } from '@/Engine';

export function createActor(name: string, grid: TSpatialGridWrapper, position: Vector3, color: string, { actorService, materialService, models3dService }: TSpaceServices): TActor {
  const material: TMaterialWrapper = materialService.create({ name: `${name}_material`, type: MaterialType.Standard, options: { color } });

  const model: TModel3d = models3dService.create({
    name: `${name}_model`,
    model3dSource: PrimitiveModel3dType.Sphere,
    materialSource: material,
    options: { radius: 0.7 },
    castShadow: true,
    receiveShadow: true,
    position: position.clone(),
    rotation: new Euler(0, 0, 0)
  });

  return actorService.create({
    name: `${name}_actor`,
    model3dSource: model,
    position: position.clone(),
    rotation: new Euler(0, 0, 0),
    spatial: { grid, isAutoUpdate: true }
  });
}

export function createRepeaterActor(actor: TActor, offset: Vector3Like, grid: TSpatialGridWrapper, gui: GUI, services: TSpaceServices, color: string = '#1ebae9'): void {
  const repeaterActor: TActor = createActor('repeater', grid, actor.drive.getPosition().clone().add(offset), color, services);

  //"repeaterActor" is connected with "positionConnector" (from "instant" agent) to "sphereActor" position
  actor.drive.position$.subscribe((position: Vector3): void => {
    // eslint-disable-next-line functional/immutable-data
    repeaterActor.drive.instant.positionConnector.x = position.x + offset.x;
    // eslint-disable-next-line functional/immutable-data
    repeaterActor.drive.instant.positionConnector.y = position.y + offset.y;
    // eslint-disable-next-line functional/immutable-data
    repeaterActor.drive.instant.positionConnector.z = position.z + offset.z;
  });

  addActorFolderGui(gui, repeaterActor);
}

export function startIntersections({ actorService, cameraService, intersectionsWatcherService, mouseService }: TSpaceServices): TIntersectionsWatcher {
  const camera: TCameraWrapper | undefined = cameraService.findActive();
  if (isNotDefined(camera)) throw new Error('Camera is not defined');
  const actor: TActor | undefined = actorService.getRegistry().findByName('surface_actor');
  if (isNotDefined(actor)) throw new Error('Actor is not defined');

  return intersectionsWatcherService.create({ actors: [actor], camera, isAutoStart: true, position$: mouseService.position$, tags: [] });
}

export function changeActorActiveAgent(actor: TActor, key: KeyCode | KeysExtra, keyboardService: TKeyboardService): Subscription {
  return keyboardService.onKey(key).pressed$.subscribe((): void => {
    const agents: ReadonlyArray<TransformAgent> = Object.values(TransformAgent);
    const index: number = agents.findIndex((agent: TransformAgent): boolean => agent === actor.drive.agent$.value);
    actor.drive.agent$.next(agents[(index + 1) % agents.length]);
  });
}

export function addActorFolderGui(gui: GUI, actor: TActor): void {
  const folder: GUI = gui.addFolder(actor.name ?? 'nameless actor');
  folder.add(actor.drive.agent$, 'value').listen();

  const position: Vector3 = new Vector3();
  actor.drive.position$.subscribe((p: Vector3): Vector3 => position.copy(p));

  folder.add(position, 'x').listen();
  folder.add(position, 'y').listen();
  folder.add(position, 'z').listen();
}
