import type { TActor, TActorService, TIntersectionEvent, TIntersectionsCameraWatcher, TSpatialGridService, TSpatialGridWrapper } from '@Anarchy/Engine';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import GUI from 'lil-gui';

export function initGui(
  mouseLineIntersectionsWatcher: TIntersectionsCameraWatcher,
  spatialGridService: TSpatialGridService,
  actorService: TActorService,
  shootingParams: Readonly<{ cooldownMs: number; speed: number }>
): void {
  const gui: GUI = new GUI();
  const grid: TSpatialGridWrapper = spatialGridService.getRegistry().getByName('main_grid');

  const mouse: Record<string, string | number> = {
    x: 0,
    y: 0,
    z: 0,
    distance: 0,
    objectId: '',
    wrapperId: '',
    objectName: ''
  };

  const cell: Record<string, string> = { name: '', actors: '' };
  const actor: Record<string, string> = { name: '' };

  mouseLineIntersectionsWatcher.value$.subscribe((intersection: TIntersectionEvent): void => {
    if (isNotDefined(intersection)) return;
    // eslint-disable-next-line functional/immutable-data
    mouse.x = intersection.point.x;
    // eslint-disable-next-line functional/immutable-data
    mouse.y = intersection.point.y;
    // eslint-disable-next-line functional/immutable-data
    mouse.z = intersection.point.z;
    // eslint-disable-next-line functional/immutable-data
    mouse.distance = intersection.distance;
    // eslint-disable-next-line functional/immutable-data
    mouse.objectId = intersection.object.uuid;
    // eslint-disable-next-line functional/immutable-data
    mouse.wrapperId = intersection.object.userData.wrapperId as string;
    // eslint-disable-next-line functional/immutable-data
    mouse.objectName = intersection.object.name;
    // eslint-disable-next-line functional/immutable-data
    cell.name = grid.findCellsForPoint(intersection.point.x, intersection.point.z)[0]?.name;
    // eslint-disable-next-line functional/immutable-data
    actor.name = actorService.getRegistry().findById(mouse.wrapperId)?.name ?? '';
    // eslint-disable-next-line functional/immutable-data
    cell.actors = grid
      .getAllInCell(intersection.point.x, intersection.point.z)
      .map((actor: TActor) => actor.name)
      .join(', ');
  });

  const mouseFolderGui: GUI = gui.addFolder('Mouse');
  mouseFolderGui.add(mouse, 'x').listen();
  mouseFolderGui.add(mouse, 'y').listen();
  mouseFolderGui.add(mouse, 'z').listen();
  mouseFolderGui.add(mouse, 'distance').listen();
  mouseFolderGui.add(mouse, 'objectId').listen();
  mouseFolderGui.add(mouse, 'wrapperId').listen();
  mouseFolderGui.add(mouse, 'objectName').listen();

  const gridFolderGui: GUI = gui.addFolder('Spatial Grid');
  gridFolderGui.add(cell, 'name').listen();
  gridFolderGui.add(cell, 'actors').listen();

  const actorFolderGui: GUI = gui.addFolder('Actor');
  actorFolderGui.add(actor, 'name').listen();

  const shootingFolderGui: GUI = gui.addFolder('Shooting');
  shootingFolderGui.add(shootingParams, 'speed').min(1).max(100).step(1);
  shootingFolderGui.add(shootingParams, 'cooldownMs').min(4).max(1000).step(10);
}
