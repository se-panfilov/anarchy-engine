import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { TransformDrive } from '@/Engine/TransformDrive/Entities';
import type { TTransformDriveFactory, TTransformDriveFactoryParams } from '@/Engine/TransformDrive/Models';

export function TransformDriveFactory(): TTransformDriveFactory {
  return ReactiveFactory(FactoryType.TransformDrive, ({ params, agents }: TTransformDriveFactoryParams) => TransformDrive(params, agents));
}
