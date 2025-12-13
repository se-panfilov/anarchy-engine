import type { IAbstractFactory } from '@Engine/Domains/Abstract';
import type { IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Mixins';

import type { IActorConfig } from './IActorConfig';
import type { IActorParams } from './IActorParams';
import type { IActorWrapper } from './IActorWrapper';
import type { IMesh } from './IMesh';

export type IActorFactory = IAbstractFromConfigWrapperFactory<IActorWrapper, IMesh, IActorParams, IActorConfig, IAbstractFactory<IActorWrapper, IActorParams>>;
