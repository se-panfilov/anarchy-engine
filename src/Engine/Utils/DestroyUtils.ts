import type { AnimationAction, AnimationClip, Material, Object3D, PositionalAudio } from 'three';
import { Mesh, Texture } from 'three';

import type { TEntity } from '@/Engine/Abstract';
import type { TAnyAudio } from '@/Engine/Audio';
import type { TWithModel3d, TWithModel3dEntities } from '@/Engine/Models3d';
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

  // eslint-disable-next-line functional/immutable-data
  if (isDefined((gltf as any).animations)) gltf.animations.length = 0;
  // eslint-disable-next-line functional/immutable-data
  gltf.userData = {};
  gltf.clear?.();
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
  if (isNotDefined(entity)) return;
  if (!hasMaterial(entity)) return;
  if (isNotDefined(entity.material)) return;

  const materials = Array.isArray(entity.material) ? entity.material : [entity.material];
  disposeMaterialDeep(materials);

  // eslint-disable-next-line functional/immutable-data
  entity.material = null;
}

export function disposeMaterialDeep(material: Material | ReadonlyArray<Material> | undefined | null): void {
  if (isNotDefined(material)) return;

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

  entity.geometry?.dispose?.();
  (entity as any).skeleton?.dispose?.();
  // eslint-disable-next-line functional/immutable-data
  entity.geometry = null;
}

export function removeFromParent(entity: any): void {
  if (isDefined(entity.removeFromParent)) return entity.removeFromParent();
  return entity.parent?.remove(entity);
}

export function stopParenting(entity: any): void {
  if (typeof entity.traverse === 'function') {
    entity.children?.forEach((child: any | undefined): void => {
      child?.traverse((descendant: any): void => {
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

  model3dSource.animations?.forEach((clip: AnimationClip): void => {
    mixer.uncacheClip(clip);
    mixer.uncacheAction(clip);
  });

  // eslint-disable-next-line functional/immutable-data
  model3dSource.animations.length = 0;
}

export function destroyAudio(entity: TAnyAudio): void {
  if (isNotDefined(entity)) return;

  try {
    entity.stop?.();
    entity.disconnect?.();
  } catch {
    console.warn('Audio: failed to stop or disconnect audio (probably already stopped or disconnected)');
  }

  // eslint-disable-next-line functional/immutable-data
  entity.buffer = null as any;
  // eslint-disable-next-line functional/immutable-data
  entity.listener = null as any;
  // eslint-disable-next-line functional/immutable-data
  entity.source = null as any;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined((entity as PositionalAudio).panner)) (entity as PositionalAudio).panner = null as any;

  entity.removeFromParent();
  entity.clear?.();
}

export function genericEntityCleanUp(entity: any): void {
  if (isNotDefined(entity)) return;

  //Remove from parent (scene)
  removeFromParent(entity);

  //Tell the children that they have no parent anymore
  stopParenting(entity);

  //Clean up transform drive
  destroyTransformDriveInEntity(entity);

  //Trigger destroy$ for model3d
  if (isDefined((entity as unknown as TWithModel3d).model3d)) (entity as unknown as TWithModel3d).model3d.destroy$.next();

  // Destroy Threejs fields and resources
  destroyGeometryInEntity(entity);
  destroyMaterialInEntity(entity);

  // Clear children if possible
  (entity as any).clear?.();

  // Dispose itself if possible
  (entity as any).dispose?.();
}
