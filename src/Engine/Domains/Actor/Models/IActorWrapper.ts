import type { IActorAccessors, IMesh } from '@Engine/Domains/Actor/Models';
import type { IWrapper } from '@Engine/Models';

export type IActorWrapper = IWrapper<IMesh> & IActorAccessors;
