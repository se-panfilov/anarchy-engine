import type { IWrapper } from '@Engine/Domains/Abstract';
import type { IActorAccessors, IMesh } from '@Engine/Domains/Actor';

export type IActorWrapper = IWrapper<IMesh> & IActorAccessors;
