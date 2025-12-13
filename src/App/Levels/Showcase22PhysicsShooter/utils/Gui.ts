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
    console.log(intersection);
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

  gui.add(mouse, 'x').listen();
  gui.add(mouse, 'y').listen();
  gui.add(mouse, 'z').listen();
  gui.add(mouse, 'distance').listen();
  gui.add(mouse, 'objectId').listen();
  gui.add(mouse, 'wrapperId').listen();
  gui.add(mouse, 'objectName').listen();
}
