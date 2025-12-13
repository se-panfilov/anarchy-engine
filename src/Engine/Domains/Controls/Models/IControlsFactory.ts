import type { IReactiveFactory } from '@Engine/Domains/Abstract';

import type { IDestroyable } from '@/Engine/Domains/Mixins';

import type { IAdditionalControlsConfigParams } from './IAdditionalControlsConfigParams';
import type { IControlsConfig } from './IControlsConfig';
import type { IControlsParams } from './IControlsParams';
import type { IOrbitControlsWrapper } from './IOrbitControlsWrapper';

export type IControlsParamsFromConfig = Readonly<{
  getParams: (config: IControlsConfig, additionalParams: IAdditionalControlsConfigParams) => IControlsParams;
}>;

export type IControlsFactory = IReactiveFactory<IOrbitControlsWrapper, IControlsParams> & IControlsParamsFromConfig & IDestroyable;
