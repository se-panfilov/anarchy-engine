import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Controls/Adapters';
import type { TControlsFactory, TControlsParams, TControlsWrapper, TOrbitControlsParams } from '@/Engine/Controls/Models';
import { OrbitControlsWrapper } from '@/Engine/Controls/Wrappers';

// eslint-disable-next-line functional/prefer-tacit
function create(params: TOrbitControlsParams): TControlsWrapper {
  // TODO Add support for other types of controls
  return OrbitControlsWrapper(params);
}

export const controlsWithConfigFactory: TReactiveFactory<TControlsWrapper, TControlsParams> = ReactiveFactory(FactoryType.Controls, create);
export const ControlsFactory = (): TControlsFactory => ({ ...controlsWithConfigFactory, configToParams });
