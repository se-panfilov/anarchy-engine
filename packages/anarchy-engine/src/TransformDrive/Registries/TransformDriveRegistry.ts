import { AbstractEntityRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TTransformDrive, TTransformDriveCompatibleEntity, TTransformDriveRegistry } from '@Anarchy/Engine/TransformDrive/Models';

export function TransformDriveRegistry(): TTransformDriveRegistry {
  return AbstractEntityRegistry<TTransformDrive<TTransformDriveCompatibleEntity>>(RegistryType.TransformDrive);
}
