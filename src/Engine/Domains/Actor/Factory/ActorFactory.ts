import type { IFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory, withConfigFactoryMixin } from '@Engine/Domains/Abstract';

import { fromConfig } from '../Adapter';
import type { IActorFactory, IActorParams, IActorWrapper } from '../Models';
import { ActorWrapper } from '../Wrapper';

const create = (params: IActorParams): IActorWrapper => ActorWrapper(params);
const factory: IFactory<IActorWrapper, IActorParams> = { ...AbstractFactory('actor'), create };
// TODO (S.Panfilov) CWP all factories should use mixins like this
export const ActorFactory = (): IActorFactory => ({ ...factory, ...withConfigFactoryMixin(factory, fromConfig) });
