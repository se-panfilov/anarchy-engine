import { AbstractEntityRegistry, RegistryType } from '@/Engine/Abstract';
import type { TTransformDrive, TTransformDriveCompatibleEntity, TTransformDriveRegistry } from '@/Engine/TransformDrive/Models';

export const TransformDriveRegistry = (): TTransformDriveRegistry => AbstractEntityRegistry<TTransformDrive<TTransformDriveCompatibleEntity>>(RegistryType.TransformDrive);
