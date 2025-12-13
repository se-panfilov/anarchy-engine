import type GUI from 'lil-gui';
import type { Observable, Subject, Subscription } from 'rxjs';
import { combineLatest } from 'rxjs';
import type { ColorRepresentation } from 'three';
import { Euler, Vector3 } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import type { Vector3Like } from 'three/src/math/Vector3';

import type {
  KeyCode,
  KeysExtra,
  TActor,
  TCameraWrapper,
  TIntersectionEvent,
  TIntersectionsWatcher,
  TKeyboardService,
  TMaterialWrapper,
  TModel3d,
  TSpaceServices,
  TSpatialGridWrapper
} from '@/Engine';
import { isNotDefined, MaterialType, PrimitiveModel3dType, TransformAgent } from '@/Engine';
import { meters } from '@/Engine/Measurements/Utils';

export function createActor(
  name: string,
  agent: TransformAgent,
  grid: TSpatialGridWrapper,
  position: Vector3,
  color: string,
  { actorService, materialService, models3dService }: TSpaceServices
): TActor {
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
    agent,
    position: position.clone(),
    rotation: new Euler(0, 0, 0),
    spatial: { grid, isAutoUpdate: true }
  });
}

export function createRepeaterActor(actor: TActor, offset: Vector3Like, grid: TSpatialGridWrapper, gui: GUI, services: TSpaceServices, color: string = '#1ebae9'): Subscription {
  const repeaterActor: TActor = createActor('repeater', TransformAgent.Connected, grid, actor.drive.getPosition().clone().add(offset), color, services);

  //"repeaterActor" is connected with "positionConnector" (from "connected" agent) to "sphereActor" position
  const subj$: Subscription = attachConnectorToSubj(repeaterActor, actor.drive.position$, offset);
  addActorFolderGui(gui, repeaterActor);
  return subj$;
}

export function attachConnectorToSubj(actor: TActor, subj: Subject<Vector3> | Observable<Vector3>, offset: Vector3Like = { x: 0, y: 0, z: 0 }): Subscription {
  return subj.subscribe((position: Vector3): void => {
    // eslint-disable-next-line functional/immutable-data
    actor.drive.connected.positionConnector.x = position.x + offset.x;
    // eslint-disable-next-line functional/immutable-data
    actor.drive.connected.positionConnector.y = position.y + offset.y;
    // eslint-disable-next-line functional/immutable-data
    actor.drive.connected.positionConnector.z = position.z + offset.z;
  });
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

// TODO LINES: refactor this with lines domain
export function createLine(color: ColorRepresentation, width: number): Line2 {
  const material = new LineMaterial({
    color,
    linewidth: meters(width),
    worldUnits: true,
    alphaToCoverage: true
  });
  const geometry: LineGeometry = new LineGeometry();
  geometry.setPositions([0, 0, 0, 0, 0, 0]);

  return new Line2(geometry, material);
}

export function createReactiveLineFromActor(color: ColorRepresentation, actor: TActor, intersectionsWatcher: TIntersectionsWatcher): { line: Line2; sub$: Subscription } {
  const line: Line2 = createLine(color, 0.1);

  const sub$: Subscription = combineLatest([intersectionsWatcher.value$, actor.drive.position$]).subscribe(([intersection, position]: [TIntersectionEvent, Vector3]): void => {
    line.geometry.setPositions([position.x, position.y, position.z, intersection.point.x, intersection.point.y, 1]);
    line.computeLineDistances();
  });

  return { line, sub$ };
}
