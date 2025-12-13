import type { IFactory, IFromConfig } from '@Engine/Domains/Abstract';
import { AbstractFactory, destroyableFactoryMixin, withConfigFactoryMixin } from '@Engine/Domains/Abstract';

import { fromConfig } from '../Adapter';
import type { IControlsConfig, IControlsFactory, IControlsParams, IControlsWrapper } from '../Models';
import { ControlsWrapper } from '../Wrapper';

const create = (params: IControlsParams): IControlsWrapper => ControlsWrapper(params);
// TODO (S.Panfilov) implement destroy
const destroy = (): void | never => {
  throw new Error('destroy is not implemented');
};

const factory: IFactory<IControlsWrapper, IControlsParams> = { ...AbstractFactory('controls'), create };

export const ControlsWithConfigFactory: IFactory<IControlsWrapper, IControlsParams> & IFromConfig<IControlsWrapper, IControlsConfig> = withConfigFactoryMixin(factory, fromConfig);

export const ControlsFactory = (): IControlsFactory => destroyableFactoryMixin(ControlsWithConfigFactory, destroy);
