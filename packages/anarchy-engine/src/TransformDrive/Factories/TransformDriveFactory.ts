import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { TransformDrive } from '@Anarchy/Engine/TransformDrive/Entities';
import type { TTransformDriveFactory, TTransformDriveFactoryParams } from '@Anarchy/Engine/TransformDrive/Models';

export function TransformDriveFactory(): TTransformDriveFactory {
  return ReactiveFactory(FactoryType.TransformDrive, ({ params, agents }: TTransformDriveFactoryParams) => TransformDrive(params, agents));
}
