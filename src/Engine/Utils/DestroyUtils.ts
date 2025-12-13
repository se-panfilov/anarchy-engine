import type { AnimationAction, AnimationClip, Material, Object3D } from 'three';
import { Mesh, Texture } from 'three';

import type { TEntity } from '@/Engine/Abstract';
import type { TWithModel3dEntities } from '@/Engine/Models3d';
import { hasTransformDrive } from '@/Engine/TransformDrive/Utils';
import { hasGeometry, hasMaterial, isDefined, isNotDefined } from '@/Engine/Utils';

export function disposeGltf(gltf: Object3D | null): void {
  if (!gltf) return;

  gltf.removeFromParent();

  gltf.traverse((child: Object3D): void => {
    if (child instanceof Mesh) {
      if (child.geometry) (child as any).geometry?.dispose();

      const materials: ReadonlyArray<Material> = Array.isArray(child.material) ? child.material : [child.material];
      disposeMaterialDeep(materials);
    }
  });

  // TODO 13-0-0: remove user data and children as functions and call them in abstract entities?
  // eslint-disable-next-line functional/immutable-data
  gltf.userData = {};
  // eslint-disable-next-line functional/immutable-data
  gltf.children.length = 0;
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

  const materials = Array.isArray(entity.material) ? entity.material : [entity.material];
  disposeMaterialDeep(materials);

  // TODO 13-0-0: not sure if it's needed to set to null
  // eslint-disable-next-line functional/immutable-data
  entity.material = null;
}

export function disposeMaterialDeep(material: Material | ReadonlyArray<Material> | undefined | null): void {
  if (!material) return;

  const materials = Array.isArray(material) ? material : [material];

  materials.forEach((material: Material | null): void => {
    if (!material) return;

    Object.values(material).forEach((value: any): void => {
      if (value instanceof Texture) value.dispose();
    });

    material.dispose();
  });
}

export function destroyGeometryInEntity(entity: unknown): void {
  if (!hasGeometry(entity)) return;

  // Dispose geometry if exists
  entity.geometry?.dispose?.();
  // eslint-disable-next-line functional/immutable-data
  entity.geometry = null;
}

export function removeFromParent(entity: any): void {
  if (isDefined(entity.removeFromParent)) return entity.removeFromParent();
  entity.parent.remove(entity);
}

export function stopParenting(entity: any): void {
  if (typeof entity.traverse === 'function') {
    entity.children?.forEach((child: any): void => {
      child.traverse((descendant: any): void => {
        if (descendant.parent?.remove) descendant.parent.remove(descendant);
      });
    });
  }
}

export function destroyModel3dAnimationEntities({ model3dSource, mixer, actions }: TEntity<TWithModel3dEntities>): void {
  if (isNotDefined(mixer)) return;

  Object.values(actions).forEach((action: AnimationAction): void => {
    action.stop();
    action.reset();
    mixer.uncacheAction(action.getClip(), action.getRoot());
  });

  mixer.stopAllAction();

  mixer.uncacheRoot(model3dSource);

  model3dSource.animations.forEach((clip: AnimationClip): void => {
    mixer.uncacheClip(clip);
    mixer.uncacheAction(clip);
  });

  // eslint-disable-next-line functional/immutable-data
  model3dSource.animations.length = 0;
}
