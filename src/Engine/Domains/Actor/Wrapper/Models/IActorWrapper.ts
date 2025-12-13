import type { IMesh, IWrapper } from '@Engine/Models';
import type { IActorAccessors } from '@Engine/Wrappers';

export type IActorWrapper = IWrapper<IMesh> & IActorAccessors;
