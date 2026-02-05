import { AbstractEntityRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TTransformDrive, TTransformDriveCompatibleEntity, TTransformDriveRegistry } from '@hellpig/anarchy-engine/TransformDrive/Models';

export function TransformDriveRegistry(): TTransformDriveRegistry {
  return AbstractEntityRegistry<TTransformDrive<TTransformDriveCompatibleEntity>>(RegistryType.TransformDrive);
}
