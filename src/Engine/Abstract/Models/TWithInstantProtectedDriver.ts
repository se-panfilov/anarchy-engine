import type { ActorDriver } from '@/Engine/Actor/Constants';

import type { TAbstractInstantDriver } from './TAbstractInstantDriver';
import type { TProtectedDriverFacade } from './TProtectedDriverFacade';

export type TWithInstantProtectedDriver = Readonly<{ [ActorDriver.Instant]: TProtectedDriverFacade<TAbstractInstantDriver> }>;
