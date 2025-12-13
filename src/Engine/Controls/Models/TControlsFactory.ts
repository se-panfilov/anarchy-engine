import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';

import type { TAdditionalControlsConfigParams } from './TAdditionalControlsConfigParams';
import type { TControlsConfig } from './TControlsConfig';
import type { TControlsParams } from './TControlsParams.ts';
import type { TControlsWrapper } from './TControlsWrapper';

export type TControlsParamsFromConfig = Omit<TParamsFromConfig<TControlsConfig, TControlsParams>, 'configToParams'> &
  Readonly<{
    configToParams: (config: TControlsConfig, dependencies: TAdditionalControlsConfigParams) => TControlsParams;
  }>;

export type TControlsFactory = TReactiveFactory<TControlsWrapper, TControlsParams> & TControlsParamsFromConfig;
