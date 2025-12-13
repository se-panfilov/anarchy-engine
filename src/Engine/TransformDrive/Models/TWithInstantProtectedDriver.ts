import type { TransformDriver } from '@/Engine/TransformDrive/Constants';

import type { TAbstractInstantDriver } from './TAbstractInstantDriver';
import type { TProtectedDriverFacade } from './TProtectedDriverFacade';

export type TWithInstantProtectedDriver = Readonly<{ [TransformDriver.Instant]: TProtectedDriverFacade<TAbstractInstantDriver> }>;
