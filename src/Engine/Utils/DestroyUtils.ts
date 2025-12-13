import type { Material, Object3D } from 'three';
import { Mesh, Texture } from 'three';

import { hasTransformDrive } from '@/Engine/TransformDrive/Utils';

export function disposeGltf(gltf: Object3D | null): void {
  if (!gltf) return;

  gltf.removeFromParent();

  gltf.traverse((child: Object3D): void => {
    if (child instanceof Mesh) {
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

export function destroyTransformDriveInEntity(result: unknown): void {
  if (!hasTransformDrive(result)) return;
  result.drive.destroy$.next();
  result.driveToTargetConnector.destroy$.next();
}
