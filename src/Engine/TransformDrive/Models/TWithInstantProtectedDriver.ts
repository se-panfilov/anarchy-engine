import type { TransformDriver } from '@/Engine/TransformDrive/Constants';

import type { TAbstractInstantDriver } from './TAbstractInstantDriver';
import type { TProtectedTransformDriverFacade } from './TProtectedTransformDriverFacade';

export type TWithInstantProtectedDriver = Readonly<{ [TransformDriver.Instant]: TProtectedTransformDriverFacade<TAbstractInstantDriver> }>;
