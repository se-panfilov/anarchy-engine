import type { Vector3 } from 'three';
import { BufferGeometry, Mesh } from 'three';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree, MeshBVH } from 'three-mesh-bvh';

BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
Mesh.prototype.raycast = acceleratedRaycast;

function initializeBVH(object: Mesh): void {
  if (object.isMesh) {
    object.geometry.computeBoundsTree();
  }
}

// Пример инициализации BVH для объектов в сцене
scene.traverse((object: Object3D) => {
  if ((object as Mesh).isMesh) {
    initializeBVH(object as Mesh);
  }
});

interface Object3D {
  position: Vector3;
  geometry: BufferGeometry;
  isMesh: boolean;
}

interface Cell {
  [key: string]: Object3D[];
}

function createSpatialHashGrid(cellSize: number): Cell {
  const cells: Cell = {};

  function getCellCoordinates(position: Vector3): string {
    return [Math.floor(position.x / cellSize), Math.floor(position.y / cellSize), Math.floor(position.z / cellSize)].join(',');
  }

  function addObject(object: Object3D): void {
    const cellCoordinates = getCellCoordinates(object.position);
    if (!cells[cellCoordinates]) {
      cells[cellCoordinates] = [];
    }
    cells[cellCoordinates].push(object);
  }

  function removeObject(object: Object3D): void {
    const cellCoordinates = getCellCoordinates(object.position);
    const cell = cells[cellCoordinates];
    if (cell) {
      const index = cell.indexOf(object);
      if (index !== -1) {
        cell.splice(index, 1);
        if (cell.length === 0) {
          delete cells[cellCoordinates];
        }
      }
    }
  }

  function updateObject(object: Object3D): void {
    removeObject(object);
    addObject(object);
  }

  function search(position: Vector3, radius: number): Object3D[] {
    const cellCoordinates = getCellCoordinates(position);
    const nearbyCells = [];

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const nearbyCellCoordinates = [cellCoordinates.split(',')[0] + x, cellCoordinates.split(',')[1] + y, cellCoordinates.split(',')[2] + z].join(',');
          if (cells[nearbyCellCoordinates]) {
            nearbyCells.push(...cells[nearbyCellCoordinates]);
          }
        }
      }
    }

    return nearbyCells.filter((object) => object.position.distanceTo(position) <= radius);
  }

  return {
    addObject,
    removeObject,
    updateObject,
    search
  };
}
