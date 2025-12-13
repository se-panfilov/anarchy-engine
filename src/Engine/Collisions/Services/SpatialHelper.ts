import type { Vector3 } from 'three';
import { Box3 } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import type { ColorRepresentation } from 'three/src/math/Color';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import { meters } from '@/Engine/Measurements/Utils';
import type { TSceneWrapper } from '@/Engine/Scene';

export function createLine(color: ColorRepresentation, width: number, positions: Array<number>): Line2 {
  const material = new LineMaterial({
    color,
    linewidth: meters(width),
    worldUnits: true,
    alphaToCoverage: true
  });
  const geometry: LineGeometry = new LineGeometry();
  geometry.setPositions(positions);

  return new Line2(geometry, material);
}

export function createOutline(actorW: TActorWrapperAsync, color: ColorRepresentation, lineWidth: number): Line2 {
  const boundingBox = new Box3().setFromObject(actorW.entity);
  const min = boundingBox.min;
  const max = boundingBox.max;
  const positions = getBoxEdges(min, max);

  return createLine(color, lineWidth, positions);
}

function getBoxEdges(min: Vector3, max: Vector3): Array<number> {
  return [
    // Bottom edges
    min.x,
    min.y,
    min.z,
    max.x,
    min.y,
    min.z,
    max.x,
    min.y,
    min.z,
    max.x,
    min.y,
    max.z,
    max.x,
    min.y,
    max.z,
    min.x,
    min.y,
    max.z,
    min.x,
    min.y,
    max.z,
    min.x,
    min.y,
    min.z,

    // Top edges
    min.x,
    max.y,
    min.z,
    max.x,
    max.y,
    min.z,
    max.x,
    max.y,
    min.z,
    max.x,
    max.y,
    max.z,
    max.x,
    max.y,
    max.z,
    min.x,
    max.y,
    max.z,
    min.x,
    max.y,
    max.z,
    min.x,
    max.y,
    min.z,

    // Vertical edges
    min.x,
    min.y,
    min.z,
    min.x,
    max.y,
    min.z,
    max.x,
    min.y,
    min.z,
    max.x,
    max.y,
    min.z,
    max.x,
    min.y,
    max.z,
    max.x,
    max.y,
    max.z,
    min.x,
    min.y,
    max.z,
    min.x,
    max.y,
    max.z
  ];
}

export function removeOutlines(scene: TSceneWrapper): void {
  scene.entity.traverse((object): void => {
    if (object.userData.outline) {
      scene.entity.remove(object.userData.outline);
      delete object.userData.outline;
    }
  });
}
