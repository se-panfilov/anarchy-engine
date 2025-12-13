import RBush from 'rbush';
import type { BufferGeometry, Intersection, Mesh, Object3D, Vector3 } from 'three';
import { Box3, Raycaster } from 'three';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';

interface BoundingBox {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  object: Object3D;
}

const spatialGrid = new RBush<BoundingBox>();

function toBoundingBox(object: Object3D): BoundingBox {
  const box: Box3 = new Box3().setFromObject(object);
  return {
    minX: box.min.x,
    minY: box.min.y,
    minZ: box.min.z,
    maxX: box.max.x,
    maxY: box.max.y,
    maxZ: box.max.z,
    object: object
  };
}

function addObjectToGrid(object: Object3D): void {
  spatialGrid.insert(toBoundingBox(object));
}

function removeObjectFromGrid(object: Object3D): void {
  spatialGrid.remove(toBoundingBox(object), (a, b) => a.object === b.object);
}

function updateObjectInGrid(object: Object3D): void {
  removeObjectFromGrid(object);
  addObjectToGrid(object);
}

function computeBVHBoundsTree(geometry: BufferGeometry, options?: BVHOptions) {
  return computeBoundsTree.call(geometry, options);
}

function disposeBVHBoundsTree(geometry: BufferGeometry) {
  return disposeBoundsTree.call(geometry);
}

function raycastWithBVH(mesh: Mesh, raycaster: Raycaster, intersects: Intersection[]) {
  return acceleratedRaycast.call(mesh, raycaster, intersects);
}

function initializeBVH(object: Mesh): void {
  if (object.isMesh) {
    computeBVHBoundsTree(object.geometry);
  }
}

scene.traverse((object: Object3D) => {
  if ((object as Mesh).isMesh) {
    initializeBVH(object as Mesh);
    addObjectToGrid(object);
  }
});

function checkCollision(bullet: Mesh, radius: number): { object: Object3D; distance: number; collisionPoint: Vector3; bulletPosition: Vector3 } | null {
  const bulletBox = new Box3().setFromObject(bullet);
  const queryBox = {
    minX: bulletBox.min.x - radius,
    minY: bulletBox.min.y - radius,
    minZ: bulletBox.min.z - radius,
    maxX: bulletBox.max.x + radius,
    maxY: bulletBox.max.y + radius,
    maxZ: bulletBox.max.z + radius
  };

  const candidates = spatialGrid.search(queryBox);
  // eslint-disable-next-line functional/no-loop-statements
  for (const candidate of candidates) {
    if (candidate.object !== bullet) {
      const raycaster = new Raycaster();
      raycaster.set(bullet.position, bullet.direction);

      const intersects: Intersection[] = [];
      raycastWithBVH(candidate.object as Mesh, raycaster, intersects);

      if (intersects.length > 0) {
        const intersect = intersects[0];
        return {
          object: candidate.object,
          distance: intersect.distance,
          collisionPoint: intersect.point,
          bulletPosition: bullet.position.clone()
        };
      }
    }
  }
  return null;
}

function animate(): void {
  requestAnimationFrame(animate);

  const movingObject = scene.getObjectByName('movingObject');
  if (movingObject) {
    updateObjectInGrid(movingObject);
  }

  bullets.forEach((bullet) => {
    if (bullet.visible) {
      const collision = checkCollision(bullet, collisionRadius);
      if (collision) {
        console.log('Hit detected', collision);
        resetBullet(bullet);
      } else if (bullet.position.distanceTo(bullet.startPosition) > maxDistance) {
        resetBullet(bullet);
      }
    }
  });

  renderer.render(scene, camera);
}

function resetBullet(bullet: Mesh) {
  bullet.position.set(0, 0, 0);
  bullet.visible = false;
  updateObjectInGrid(bullet);
}

animate();
