import type { Material, Object3D } from 'three';
import { Mesh, Texture } from 'three';

import { hasTransformDrive } from '@/Engine/TransformDrive/Utils';
import { hasGeometry, hasMaterial, isNotDefined } from '@/Engine/Utils';

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

export function destroyTransformDriveInEntity(entity: unknown): void {
  if (!hasTransformDrive(entity)) return;
  entity.drive.destroy$.next();
  entity.driveToTargetConnector.destroy$.next();
}

export function destroyMaterialInEntity(entity: unknown): void {
  if (!hasMaterial(entity)) return;
  if (isNotDefined(entity.material)) return;

  // Dispose material if exists
  if (Array.isArray(entity.material)) {
    entity.material.forEach((mat: unknown): void => (mat as any).dispose?.());
  } else {
    entity.material.dispose?.();
  }

  entity.material.map.dispose();

  // eslint-disable-next-line functional/immutable-data
  entity.material = null;
}

export function destroyGeometryInEntity(entity: unknown): void {
  if (!hasGeometry(entity)) return;

  // Dispose geometry if exists
  entity.geometry?.dispose?.();
  // eslint-disable-next-line functional/immutable-data
  entity.geometry = null;
}
