import type { IReactiveFactory } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IAdditionalControlsConfigParams } from './IAdditionalControlsConfigParams';
import type { IOrbitControlsConfig } from './IOrbitControlsConfig';
import type { IOrbitControlsParams } from './IOrbitControlsParams.ts';
import type { IOrbitControlsWrapper } from './IOrbitControlsWrapper';

export type IControlsParamsFromConfig = Readonly<{
  configToParams: (config: IOrbitControlsConfig, additionalParams: IAdditionalControlsConfigParams) => IOrbitControlsParams;
}>;

export type IControlsFactory = IReactiveFactory<IOrbitControlsWrapper, IOrbitControlsParams> & IControlsParamsFromConfig & IDestroyable;
