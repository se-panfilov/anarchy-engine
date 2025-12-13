import type { IParamsFromConfig, IReactiveFactory } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IAdditionalControlsConfigParams } from './IAdditionalControlsConfigParams';
import type { IControlsConfig } from './IControlsConfig';
import type { IControlsParams } from './IControlsParams.ts';
import type { IControlsWrapper } from './IControlsWrapper';

export type IControlsParamsFromConfig = Omit<IParamsFromConfig<IControlsConfig, IControlsParams>, 'configToParams'> &
  Readonly<{
    configToParams: (config: IControlsConfig, additionalParams: IAdditionalControlsConfigParams) => IControlsParams;
  }>;

export type IControlsFactory = IReactiveFactory<IControlsWrapper, IControlsParams> & IControlsParamsFromConfig & IDestroyable;
