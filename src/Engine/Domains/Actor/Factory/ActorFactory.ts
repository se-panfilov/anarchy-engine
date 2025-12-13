import type { IFactory, IReactiveFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory } from '@Engine/Domains/Abstract';
import { destroyableMixin } from '@Engine/Domains/Mixins';
import { Subject } from 'rxjs';

import { getParams } from '../Adapter';
import type { IActorFactory, IActorParams, IActorWrapper } from '../Models';
import { ActorWrapper } from '../Wrapper';

const abstractFactory: Omit<IFactory<IActorWrapper, IActorParams>, 'create'> = { ...AbstractFactory('actor') };

const reactiveFactory: Omit<IFactory<IActorWrapper, IActorParams> & IReactiveFactory<IActorWrapper>, 'create'> = {
  ...abstractFactory,
  entityCreated$: new Subject<IActorWrapper>(),
  destroyed$: new Subject<void>()
};

const factory: IFactory<IActorWrapper, IActorParams> & IReactiveFactory<IActorWrapper> = {
  ...reactiveFactory,
  create: (params: IActorParams): IActorWrapper => {
    const wrapper: IActorWrapper = ActorWrapper(params);
    reactiveFactory.entityCreated$.next(wrapper);
    return wrapper;
  }
};

export const ActorFactory = (): IActorFactory => ({ ...factory, getParams, ...destroyableMixin(factory) });
