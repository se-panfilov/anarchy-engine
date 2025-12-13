import type { Vector3 } from 'three';
import { Box3, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import type { ColorRepresentation } from 'three/src/math/Color';

import type { TActor } from '@/Engine/Actor';
import { meters } from '@/Engine/Measurements/Utils';

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

export function createOutline(actor: TActor, color: ColorRepresentation, lineWidth: number): Line2 {
  const boundingBox = new Box3().setFromObject(actor.model.getRawModel3d());
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

export function createBoundingBox(minX: number, minZ: number, maxX: number, maxZ: number, color: ColorRepresentation = '#00ff00', wireframe: boolean = true): Mesh {
  const geometry: PlaneGeometry = new PlaneGeometry(maxX - minX, maxZ - minZ);
  const material: MeshBasicMaterial = new MeshBasicMaterial({ color, wireframe });
  const plane: Mesh = new Mesh(geometry, material);
  plane.position.set((minX + maxX) / 2, 0, (minZ + maxZ) / 2);
  // eslint-disable-next-line functional/immutable-data
  plane.rotation.x = -Math.PI / 2;
  return plane;
}
