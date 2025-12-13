import type { ICreateFN } from '@Engine/Domains/Abstract';

import type { IActorParams } from './IActorParams';
import type { IActorWrapper } from './IActorWrapper';

export type ICreateActorFn = ICreateFN<IActorWrapper, IActorParams>;
