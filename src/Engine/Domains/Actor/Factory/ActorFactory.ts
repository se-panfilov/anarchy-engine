import type { IFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory, destroyableFactoryMixin, withConfigMixin } from '@Engine/Domains/Abstract';

import { fromConfig } from '../Adapter';
import type { IActorFactory, IActorParams, IActorWrapper } from '../Models';
import { ActorWrapper } from '../Wrapper';

const create = (params: IActorParams): IActorWrapper => ActorWrapper(params);
const factory: IFactory<IActorWrapper, IActorParams> = { ...AbstractFactory('actor'), create };
export const ActorFactory = (): IActorFactory => ({ ...factory, ...withConfigMixin(fromConfig), ...destroyableFactoryMixin(factory) });
