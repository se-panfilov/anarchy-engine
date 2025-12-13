import type GUI from 'lil-gui';
import type { Observable, Subject, Subscription } from 'rxjs';
import { combineLatest, distinctUntilChanged, map } from 'rxjs';
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
  TOrbitControlsWrapper,
  TParticlesWrapper,
  TSpaceServices,
  TSpatialGridWrapper,
  TWithConnectedTransformAgent,
  TWithPresetNamePhysicsBodyParams,
  TWithTransformDrive
} from '@/Engine';
import { isNotDefined, MaterialType, PrimitiveModel3dType, TransformAgent } from '@/Engine';
import { meters } from '@/Engine/Measurements/Utils';

export function createActor(
  name: string,
  agent: TransformAgent,
  grid: TSpatialGridWrapper,
  position: Vector3,
  color: string,
  physics: TWithPresetNamePhysicsBodyParams | undefined,
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
    physics,
    agent,
    position: position.clone(),
    rotation: new Euler(0, 0, 0),
    spatial: { grid, isAutoUpdate: true }
    // collisions: { isAutoUpdate: name === 'sphere' }
  });
}

export function createRepeaterActor(actor: TActor, offset: Vector3Like, grid: TSpatialGridWrapper, gui: GUI, services: TSpaceServices, color: string = '#1ebae9'): Subscription {
  const repeaterActor: TActor = createActor('repeater', TransformAgent.Connected, grid, actor.drive.getPosition().clone().add(offset), color, undefined, services);

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
  const surfaceActor: TActor | undefined = actorService.getRegistry().findByName('surface_actor');
  if (isNotDefined(surfaceActor)) throw new Error('Actor is not defined');
  const boxActor: TActor | undefined = actorService.getRegistry().findByName('box_actor');
  if (isNotDefined(boxActor)) throw new Error('Actor is not defined');

  return intersectionsWatcherService.create({ actors: [surfaceActor, boxActor], camera, isAutoStart: true, position$: mouseService.position$, tags: [] });
}

export function changeActorActiveAgent(actor: TActor, key: KeyCode | KeysExtra, keyboardService: TKeyboardService): Subscription {
  return keyboardService.onKey(key).pressed$.subscribe((): void => {
    const agents: ReadonlyArray<TransformAgent> = Object.values(TransformAgent);
    const index: number = agents.findIndex((agent: TransformAgent): boolean => agent === actor.drive.agent$.value);
    actor.drive.agent$.next(agents[(index + 1) % agents.length]);
  });
}

export function connectCameraToActor(camera: TCameraWrapper, controls: TOrbitControlsWrapper, actor: TActor, gui: GUI): void {
  const cameraSettings = { isFollowingActor: false };
  const folder: GUI = gui.addFolder('Camera');
  folder.add(cameraSettings, 'isFollowingActor').name('Following mode');

  actor.drive.position$
    .pipe(
      map((position: Vector3): { position: Vector3; isFollowingActor: boolean } => ({
        position: position.clone(),
        isFollowingActor: cameraSettings.isFollowingActor
      }))
    )
    .subscribe(({ position, isFollowingActor }: { position: Vector3; isFollowingActor: boolean }): void => {
      if (isFollowingActor) {
        // we can do just this, but here we want to test the "connected" agent of a camera
        // camera.drive.position$.next(position.clone().add(new Vector3(0, 10, 0)));
        camera.drive.agent$.next(TransformAgent.Connected);
        // eslint-disable-next-line functional/immutable-data
        camera.drive.connected.positionConnector.x = position.x;
        // eslint-disable-next-line functional/immutable-data
        camera.drive.connected.positionConnector.y = position.y + 10;
        // eslint-disable-next-line functional/immutable-data
        camera.drive.connected.positionConnector.z = position.z;
        camera.lookAt(position);
      }
    });

  actor.drive.position$
    .pipe(
      map((): { isFollowingActor: boolean } => ({
        isFollowingActor: cameraSettings.isFollowingActor
      })),
      distinctUntilChanged(({ isFollowingActor: prev }, { isFollowingActor: curr }): boolean => prev === curr)
    )
    .subscribe(({ isFollowingActor }: { isFollowingActor: boolean }): void => {
      if (isFollowingActor) {
        if (controls.isEnable()) controls.disable();
      } else {
        controls.enable();
        camera.drive.agent$.next(TransformAgent.Default);
      }
    });
}

export function connectObjToActor(folderName: string, obj: TWithTransformDrive<TWithConnectedTransformAgent>, actor: TActor, gui: GUI): void {
  const objSettings = { isFollowingActor: false };
  const folder: GUI = gui.addFolder(folderName);
  folder.add(objSettings, 'isFollowingActor').name('Following mode');

  actor.drive.position$
    .pipe(
      map((position: Vector3): { position: Vector3; isFollowingActor: boolean } => ({
        position: position.clone(),
        isFollowingActor: objSettings.isFollowingActor
      }))
    )
    .subscribe(({ position, isFollowingActor }: { position: Vector3; isFollowingActor: boolean }): void => {
      if (isFollowingActor) {
        // we can do just this, but here we want to test the "connected" agent of an obj
        // obj.drive.position$.next(position.clone().add(new Vector3(0, 4, 0)));
        // eslint-disable-next-line functional/immutable-data
        obj.drive.connected.positionConnector.x = position.x;
        // eslint-disable-next-line functional/immutable-data
        obj.drive.connected.positionConnector.y = position.y + 4;
        // eslint-disable-next-line functional/immutable-data
        obj.drive.connected.positionConnector.z = position.z;
      }
    });

  actor.drive.position$
    .pipe(
      map((): { isFollowingActor: boolean } => ({
        isFollowingActor: objSettings.isFollowingActor
      })),
      distinctUntilChanged(({ isFollowingActor: prev }, { isFollowingActor: curr }): boolean => prev === curr)
    )
    .subscribe(({ isFollowingActor }: { isFollowingActor: boolean }): void => {
      if (isFollowingActor) {
        // we can do just this, but here we want to test the "connected" agent of an obj
        // obj.drive.position$.next(position.clone().add(new Vector3(0, 4, 0)));
        obj.drive.agent$.next(TransformAgent.Connected);
      } else {
        obj.drive.agent$.next(TransformAgent.Default);
      }
    });
}

export function addActorFolderGui(gui: GUI, actor: TActor): void {
  const folder: GUI = gui.addFolder(actor.name ?? 'nameless actor');
  folder.add(actor.drive.agent$, 'value').name('agent').listen();

  const position: Vector3 = new Vector3();
  actor.drive.position$.subscribe((p: Vector3): Vector3 => position.copy(p));

  folder.add(position, 'x').listen();
  folder.add(position, 'y').listen();
  folder.add(position, 'z').listen();
}

export function addSpatialGuiFolder(gui: GUI, grid: TSpatialGridWrapper, mouseLineIntersectionsWatcher: TIntersectionsWatcher): void {
  const cell: Record<string, string> = { name: '', actors: '' };

  mouseLineIntersectionsWatcher.value$.subscribe((intersection: TIntersectionEvent) => {
    // eslint-disable-next-line functional/immutable-data
    cell.name = grid.findCellsForPoint(intersection.point.x, intersection.point.z)[0]?.name;
    // eslint-disable-next-line functional/immutable-data
    cell.actors = grid
      .getAllInCell(intersection.point.x, intersection.point.z)
      .map((actor: TActor): string | undefined => actor.name)
      .join(', ');
  });

  const gridFolderGui: GUI = gui.addFolder('Spatial Grid');
  gridFolderGui.add(cell, 'name').listen();
  gridFolderGui.add(cell, 'actors').listen();
}

export function setParticles(particles: TParticlesWrapper, count: number = 500, area: number = 10): void {
  const positions: Float32Array = new Float32Array(count * 3);
  const colors: Float32Array = new Float32Array(count * 3);

  // eslint-disable-next-line functional/no-loop-statements
  for (let i: number = 0; i < count * 3; i++) {
    // eslint-disable-next-line functional/immutable-data
    positions[i] = (Math.random() - 0.5) * area;
    // eslint-disable-next-line functional/immutable-data
    colors[i] = Math.random();
  }

  particles.setIndividualPositions(positions);
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
    line.geometry.setPositions([position.x, position.y, position.z, intersection.point.x, intersection.point.y, intersection.point.z]);
    line.computeLineDistances();
  });

  return { line, sub$ };
}
