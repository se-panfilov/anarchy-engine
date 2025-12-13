import type { IParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { IAdditionalControlsConfigParams } from './IAdditionalControlsConfigParams';
import type { IControlsConfig } from './IControlsConfig';
import type { IControlsParams } from './IControlsParams.ts';
import type { IControlsWrapper } from './IControlsWrapper';

export type IControlsParamsFromConfig = Omit<IParamsFromConfig<IControlsConfig, IControlsParams>, 'configToParams'> &
  Readonly<{
    configToParams: (config: IControlsConfig, dependencies: IAdditionalControlsConfigParams) => IControlsParams;
  }>;

export type IControlsFactory = TReactiveFactory<IControlsWrapper, IControlsParams> & IControlsParamsFromConfig & TDestroyable;
