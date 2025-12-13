import type { IWrapper } from '@/Engine/Domains/Abstract';

import type { IActorAccessors } from './IActorAccessors';
import type { IMesh } from './IMesh';

export type IActorWrapper = IWrapper<IMesh> & IActorAccessors;
