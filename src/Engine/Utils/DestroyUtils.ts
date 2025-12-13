import type { Material, Object3D } from 'three';
import { Mesh, Texture } from 'three';

export function disposeGltf(gltf: Object3D | null): void {
  if (!gltf) return;

  gltf.removeFromParent();

  gltf.traverse((child: Object3D): void => {
    if (child instanceof Mesh) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
      if (child.geometry) (child as any).geometry?.dispose();

      const materials: ReadonlyArray<Material> = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material: Material | null): void => {
        if (!material) return;

        Object.values(material).forEach((value) => {
          if (value instanceof Texture) {
            value.dispose();
          }
        });

        material.dispose();
      });
    }
  });

  // eslint-disable-next-line functional/immutable-data
  gltf.userData = {};
  // eslint-disable-next-line functional/immutable-data
  gltf.children = [];
  gltf = null;
}
