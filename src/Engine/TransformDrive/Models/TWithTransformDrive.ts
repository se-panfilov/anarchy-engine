import type { TAbstractTransformAgent, TransformAgent } from '@/Engine/TransformDrive';

import type { TTransformDrive } from './TTransformDrive';

export type TWithTransformDrive<T extends Partial<Record<TransformAgent, TAbstractTransformAgent>>> = Readonly<{
  drive: TTransformDrive<T>;
}>;
