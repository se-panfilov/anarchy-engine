import type { IFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory } from '@Engine/Domains/Abstract';
import { destroyableMixin } from '@Engine/Domains/Mixins';

import { getParams } from '../Adapter';
import type { IActorFactory, IActorParams, IActorWrapper } from '../Models';
import { ActorWrapper } from '../Wrapper';

const create = (params: IActorParams): IActorWrapper => ActorWrapper(params);
const factory: IFactory<IActorWrapper, IActorParams> = { ...AbstractFactory('actor'), create };
export const ActorFactory = (): IActorFactory => ({ ...factory, getParams, ...destroyableMixin(factory) });
