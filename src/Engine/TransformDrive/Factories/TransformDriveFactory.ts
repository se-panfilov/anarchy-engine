import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { TransformDrive } from '@/Engine/TransformDrive/Drive';
import type { TTransformDriveFactory } from '@/Engine/TransformDrive/Models';

export function TransformDriveFactory(): TTransformDriveFactory {
  return ReactiveFactory(FactoryType.TransformDrive, TransformDrive);
}
