import type { Intersection, Mesh, Object3D, Vector3 } from 'three';
import { Box3, Raycaster } from 'three';

scene.traverse((object: Object3D) => {
  if ((object as Mesh).isMesh) {
    initializeBVH(object as Mesh);
    addObjectToGrid(object);
    visualizeBVH(object as Mesh, scene);
  }
});

visualizeRBush(spatialGrid, scene);
animate();
