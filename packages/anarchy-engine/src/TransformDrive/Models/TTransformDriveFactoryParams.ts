import type { TransformAgent } from '@Engine/TransformDrive/Constants';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';
import type { TTransformDriveParams } from './TTransformDriveParams';

export type TTransformDriveFactoryParams = Readonly<{
  params: TTransformDriveParams;
  agents: Partial<Record<TransformAgent, TAbstractTransformAgent>>;
}>;
