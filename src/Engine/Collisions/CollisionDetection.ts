import type { Intersection, Mesh, Object3D, Vector3 } from 'three';
import { Box3, Raycaster } from 'three';

scene.traverse((object: Object3D) => {
  if ((object as Mesh).isMesh) {
    initializeBVH(object as Mesh);
    addObjectToGrid(object);
    visualizeBVH(object as Mesh, scene);
  }
});

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

visualizeRBush(spatialGrid, scene);
animate();
