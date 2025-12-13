import type { IActorAccessors, IMesh } from '@Engine/Domains/Actor';
import type { IWrapper } from '@Engine/Models';

export type IActorWrapper = IWrapper<IMesh> & IActorAccessors;
