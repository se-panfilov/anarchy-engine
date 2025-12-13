import GUI from 'lil-gui';

import type { TIntersectionEvent, TIntersectionsWatcher } from '@/Engine';

export function initGui(mouseLineIntersectionsWatcher: TIntersectionsWatcher): void {
  const gui: GUI = new GUI();

  const mouse: Record<string, any> = {
    x: 0,
    y: 0,
    z: 0,
    distance: 0,
    objectId: '',
    wrapperId: '',
    objectName: ''
  };

  mouseLineIntersectionsWatcher.value$.subscribe((intersection: TIntersectionEvent) => {
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
    mouse.wrapperId = intersection.object.userData.wrapperId;
    // eslint-disable-next-line functional/immutable-data
    mouse.objectName = intersection.object.name;
  });

  const mouseFolderGui: GUI = gui.addFolder('Mouse');
  mouseFolderGui.add(mouse, 'x').listen();
  mouseFolderGui.add(mouse, 'y').listen();
  mouseFolderGui.add(mouse, 'z').listen();
  mouseFolderGui.add(mouse, 'distance').listen();
  mouseFolderGui.add(mouse, 'objectId').listen();
  mouseFolderGui.add(mouse, 'wrapperId').listen();
  mouseFolderGui.add(mouse, 'objectName').listen();
}
