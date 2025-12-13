import { AbstractEntityRegistry, RegistryType } from '@Engine/Abstract';
import type { TTransformDrive, TTransformDriveCompatibleEntity, TTransformDriveRegistry } from '@Engine/TransformDrive/Models';

export function TransformDriveRegistry(): TTransformDriveRegistry {
  return AbstractEntityRegistry<TTransformDrive<TTransformDriveCompatibleEntity>>(RegistryType.TransformDrive);
}
