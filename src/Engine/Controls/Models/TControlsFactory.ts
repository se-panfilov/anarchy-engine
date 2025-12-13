import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';

import type { TAdditionalControlsConfigParams } from './TAdditionalControlsConfigParams';
import type { TControlsConfig } from './TControlsConfig';
import type { TControlsParams } from './TControlsParams.ts';
import type { TAnyControlsWrapper } from './TAnyControlsWrapper';

export type TControlsParamsFromConfig = Omit<TParamsFromConfig<TControlsConfig, TControlsParams>, 'configToParams'> &
  Readonly<{
    configToParams: (config: TControlsConfig, dependencies: TAdditionalControlsConfigParams) => TControlsParams;
  }>;

export type TControlsFactory = TReactiveFactory<TAnyControlsWrapper, TControlsParams> & TControlsParamsFromConfig;
