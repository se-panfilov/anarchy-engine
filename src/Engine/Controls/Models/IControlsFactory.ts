import type { IReactiveFactory } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IAdditionalControlsConfigParams } from './IAdditionalControlsConfigParams';
import type { IControlsConfig } from './IControlsConfig';
import type { IControlsParams } from './IControlsParams.ts';
import type { IControlsWrapper } from './IControlsWrapper';

export type IControlsParamsFromConfig = Readonly<{
  configToParams: (config: IControlsConfig, additionalParams: IAdditionalControlsConfigParams) => IControlsParams;
}>;

export type IControlsFactory = IReactiveFactory<IControlsWrapper, IControlsParams> & IControlsParamsFromConfig & IDestroyable;
