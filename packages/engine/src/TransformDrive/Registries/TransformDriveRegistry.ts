import { AbstractEntityRegistry, RegistryType } from '@/Abstract';
import type { TTransformDrive, TTransformDriveCompatibleEntity, TTransformDriveRegistry } from '@/TransformDrive/Models';

export function TransformDriveRegistry(): TTransformDriveRegistry {
  return AbstractEntityRegistry<TTransformDrive<TTransformDriveCompatibleEntity>>(RegistryType.TransformDrive);
}
