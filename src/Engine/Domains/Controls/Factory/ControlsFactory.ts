import type { IFactory, IFromConfig } from '@Engine/Domains/Abstract';
import { AbstractFactory, destroyableFactoryMixin, withConfigMixin } from '@Engine/Domains/Abstract';

import { fromConfig } from '../Adapter';
import type { IControlsConfig, IControlsFactory, IControlsParams, IControlsWrapper } from '../Models';
import { ControlsWrapper } from '../Wrapper';

const create = (params: IControlsParams): IControlsWrapper => ControlsWrapper(params);
const factory: IFactory<IControlsWrapper, IControlsParams> = { ...AbstractFactory('controls'), create };
export const ControlsWithConfigFactory: IFactory<IControlsWrapper, IControlsParams> & IFromConfig<IControlsConfig, IControlsParams> = { ...factory, ...withConfigMixin(fromConfig) };
export const ControlsFactory = (): IControlsFactory => ({ ...ControlsWithConfigFactory, ...destroyableFactoryMixin(ControlsWithConfigFactory) });
