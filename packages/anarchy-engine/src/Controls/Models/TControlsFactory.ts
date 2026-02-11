import type { TParamsFromConfig, TReactiveFactory } from '@Anarchy/Engine/Abstract';

import type { TAdditionalControlsConfigParams } from './TAdditionalControlsConfigParams';
import type { TAnyControlsWrapper } from './TAnyControlsWrapper';
import type { TControlsConfig } from './TControlsConfig';
import type { TControlsParams } from './TControlsParams.ts';

export type TControlsParamsFromConfig = Omit<TParamsFromConfig<TControlsConfig, TControlsParams>, 'configToParams'> &
  Readonly<{
    configToParams: (config: TControlsConfig, dependencies: TAdditionalControlsConfigParams) => TControlsParams;
  }>;

export type TControlsFactory = TReactiveFactory<TAnyControlsWrapper, TControlsParams> & TControlsParamsFromConfig;
