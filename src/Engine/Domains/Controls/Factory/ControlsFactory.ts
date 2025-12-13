import type { IFactory, IParamsFromConfig } from '@Engine/Domains/Abstract';
import { AbstractFactory } from '@Engine/Domains/Abstract';
import { destroyableMixin } from '@Engine/Domains/Mixins';

import { getParams } from '../Adapter';
import type { IControlsConfig, IControlsFactory, IControlsParams, IControlsWrapper } from '../Models';
import { ControlsWrapper } from '../Wrapper';

const create = (params: IControlsParams): IControlsWrapper => ControlsWrapper(params);
const factory: IFactory<IControlsWrapper, IControlsParams> = { ...AbstractFactory('controls'), create };
export const ControlsWithConfigFactory: IFactory<IControlsWrapper, IControlsParams> & IParamsFromConfig<IControlsConfig, IControlsParams> = { ...factory, getParams };
export const ControlsFactory = (): IControlsFactory => ({ ...ControlsWithConfigFactory, ...destroyableMixin(ControlsWithConfigFactory) });
