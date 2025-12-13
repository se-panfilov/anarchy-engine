import type { IWrapper } from '@Engine/Models';
import type { IActorAccessors, IMesh } from '@Engine/Domains/Actor/Models';

export type IActorWrapper = IWrapper<IMesh> & IActorAccessors;
