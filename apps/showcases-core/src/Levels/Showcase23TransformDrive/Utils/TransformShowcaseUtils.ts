import type {
  KeyCode,
  TActor,
  TAnyCameraWrapper,
  TAnyMaterialWrapper,
  TIntersectionEvent,
  TIntersectionsCameraWatcher,
  TKeyboardService,
  TModel3d,
  TOrbitControlsWrapper,
  TParticlesWrapper,
  TPhysicsBody,
  TPhysicsBodyParams,
  TReadonlyVector3,
  TSpaceServices,
  TSpatialGridWrapper,
  TWithConnectedTransformAgent,
  TWithTransformDrive
} from '@Anarchy/Engine';
import { ForwardAxis, MaterialType, metersPerSecond, onKey, TransformAgent } from '@Anarchy/Engine';
import { meters } from '@Anarchy/Engine/Measurements/Utils';
import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import type GUI from 'lil-gui';
import type { Subscription } from 'rxjs';
import { combineLatest, distinctUntilChanged, map } from 'rxjs';
import type { ColorRepresentation, Vector3Like } from 'three';
import { Euler, Quaternion, Vector3 } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { attachConnectorPositionToSubj, attachConnectorRotationToSubj } from '@/Utils';

export function createActor(
  name: string,
  model3d: GLTF | TModel3d,
  agent: TransformAgent,
  grid: TSpatialGridWrapper,
  position: Vector3,
  color: string,
  physics: Omit<TPhysicsBodyParams, 'position' | 'rotation'> | undefined,
  { actorService, materialService, models3dService, physicsBodyService }: TSpaceServices
): TActor {
  const material: TAnyMaterialWrapper = materialService.create({ name: `${name}_material`, type: MaterialType.Standard, options: { color } });

  const rotation: Euler = new Euler(0, 0, 0);

  let physicsBody: TPhysicsBody | undefined;
  if (isDefined(physics)) physicsBody = physicsBodyService.create({ ...physics, position, rotation: new Quaternion().setFromEuler(rotation) });

  let model: TModel3d;

  if ((model3d as TModel3d).id) {
    model = model3d as TModel3d;
  } else {
    model = models3dService.create({
      name: `${name}_model`,
      model3dSource: model3d as GLTF,
      material,
      options: { radius: meters(0.7) },
      castShadow: true,
      receiveShadow: true,
      position,
      rotation
    });
  }

  return actorService.create({
    name: `${name}_actor`,
    model3dSource: model,
    physicsBody,
    agent,
    position: position.clone(),
    rotation: new Euler(0, 0, 0),
    scale: new Vector3(0.025, 0.025, 0.025),
    spatial: { grid, isAutoUpdate: true },
    kinematic: {
      state: {
        forwardAxis: ForwardAxis.Z
      }
    }
    // collisions: { isAutoUpdate: name === 'sphere' }
  });
}

export function createRepeaterActor(actor: TActor, model3d: TModel3d, offset: Vector3Like, grid: TSpatialGridWrapper, gui: GUI, services: TSpaceServices, color: string = '#1ebae9'): void {
  const repeaterActor: TActor = createActor('repeater', model3d, TransformAgent.Connected, grid, actor.drive.position$.value.clone().add(offset), color, undefined, services);

  //"repeaterActor" is connected with "positionConnector" (from "connected" agent) to "sphereActor" position
  attachConnectorPositionToSubj(repeaterActor, actor.drive.position$, offset);
  attachConnectorRotationToSubj(repeaterActor, actor.drive.rotation$);
  addActorFolderGui(gui, repeaterActor);
}

export function startIntersections({ actorService, cameraService, intersectionsWatcherService, mouseService, loopService }: TSpaceServices): TIntersectionsCameraWatcher {
  const camera: TAnyCameraWrapper = cameraService.getActive();
  const surfaceActor: TActor = actorService.getRegistry().getByName('surface_actor');
  const boxActor1: TActor = actorService.getRegistry().getByName('box_actor_1');
  const boxActor2: TActor = actorService.getRegistry().getByName('box_actor_2');

  return intersectionsWatcherService.create({
    name: 'intersections_watcher',
    actors: [surfaceActor, boxActor1, boxActor2],
    camera,
    isAutoStart: true,
    position$: mouseService.normalizedPosition$,
    intersectionsLoop: loopService.getIntersectionsLoop()
  }) as TIntersectionsCameraWatcher;
}

export function changeActorActiveAgent(actor: TActor, key: KeyCode, keyboardService: TKeyboardService): Subscription {
  return keyboardService.keys$.pipe(onKey(key)).subscribe((): void => {
    const agents: ReadonlyArray<TransformAgent> = Object.values(TransformAgent);
    const index: number = agents.findIndex((agent: TransformAgent): boolean => agent === actor.drive.agent$.value);
    actor.drive.agent$.next(agents[(index + 1) % agents.length]);
  });
}

export function connectCameraToActor(camera: TAnyCameraWrapper, controls: TOrbitControlsWrapper, actor: TActor, gui: GUI): void {
  const cameraSettings = { isFollowingActor: false };
  const folder: GUI = gui.addFolder('Camera');
  folder.add(cameraSettings, 'isFollowingActor').name('Following mode');

  actor.drive.position$
    .pipe(
      map((position: TReadonlyVector3): { position: TReadonlyVector3; isFollowingActor: boolean } => ({
        position: position.clone(),
        isFollowingActor: cameraSettings.isFollowingActor
      }))
    )
    .subscribe(({ position, isFollowingActor }: { position: TReadonlyVector3; isFollowingActor: boolean }): void => {
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
        camera.lookAt(position as Vector3);
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
      map((position: TReadonlyVector3): { position: TReadonlyVector3; isFollowingActor: boolean } => ({
        position: position.clone(),
        isFollowingActor: objSettings.isFollowingActor
      }))
    )
    .subscribe(({ position, isFollowingActor }: { position: TReadonlyVector3; isFollowingActor: boolean }): void => {
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
  actor.drive.position$.subscribe((p: TReadonlyVector3): TReadonlyVector3 => position.copy(p));

  folder.add(position, 'x').listen();
  folder.add(position, 'y').listen();
  folder.add(position, 'z').listen();
}

export function addKinematicActorFolderGui(gui: GUI, actor: TActor): void {
  const folder: GUI = gui.addFolder('Kinematic actions');
  folder.add(actor.drive.agent$, 'value').name('agent').listen();

  actor.drive.kinematic.setRadius(meters(1));
  const kinematicActions = {
    rotateLeftY: (): void => actor.drive.kinematic.rotateTo(new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), 1), metersPerSecond(5), true), // Y "left"
    rotateRightY: (): void => actor.drive.kinematic.rotateTo(new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), -1), metersPerSecond(5), true), // Y "right"
    rotateUpX: (): void => actor.drive.kinematic.rotateTo(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), 1), metersPerSecond(5), true), // X "up"
    rotateDownX: (): void => actor.drive.kinematic.rotateTo(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -1), metersPerSecond(5), true), // X "down"
    rotateForwardZ: (): void => actor.drive.kinematic.rotateTo(new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), 1), metersPerSecond(5), true), // Z "forward"
    rotateBackwardZ: (): void => actor.drive.kinematic.rotateTo(new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), -1), metersPerSecond(5), true), // Z "backward"
    rotateXyLeft: (): void => actor.drive.kinematic.rotateTo(new Quaternion().setFromEuler(new Euler(Math.PI / 4, 1, 0, 'YXZ')), metersPerSecond(5), true), // X 45° + Y "left"
    rotateXyRight: (): void => actor.drive.kinematic.rotateTo(new Quaternion().setFromEuler(new Euler(-Math.PI / 4, -1, 0, 'YXZ')), metersPerSecond(5), true) // X -45° + Y "right"
  };
  gui.add(kinematicActions, 'rotateLeftY');
  gui.add(kinematicActions, 'rotateRightY');
  gui.add(kinematicActions, 'rotateUpX');
  gui.add(kinematicActions, 'rotateDownX');
  gui.add(kinematicActions, 'rotateForwardZ');
  gui.add(kinematicActions, 'rotateBackwardZ');
  gui.add(kinematicActions, 'rotateXyLeft');
  gui.add(kinematicActions, 'rotateXyRight');
}

export function addSpatialGuiFolder(gui: GUI, grid: TSpatialGridWrapper, mouseLineIntersectionsWatcher: TIntersectionsCameraWatcher): void {
  const cell: Record<string, string> = { name: '', actors: '' };

  mouseLineIntersectionsWatcher.value$.subscribe((intersection: TIntersectionEvent): void => {
    if (isNotDefined(intersection)) throw new Error('Intersection not defined');
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

export function createReactiveLineFromActor(
  color: ColorRepresentation,
  actor: TActor,
  intersectionsWatcher: TIntersectionsCameraWatcher
): {
  line: Line2;
  sub$: Subscription;
} {
  const line: Line2 = createLine(color, 0.1);

  const sub$: Subscription = combineLatest([intersectionsWatcher.value$, actor.drive.position$]).subscribe(([intersection, position]: [TIntersectionEvent, TReadonlyVector3]): void => {
    if (isNotDefined(intersection)) throw new Error('Intersection not defined');
    line.geometry.setPositions([position.x, position.y, position.z, intersection.point.x, intersection.point.y, intersection.point.z]);
    line.computeLineDistances();
  });

  return { line, sub$ };
}
