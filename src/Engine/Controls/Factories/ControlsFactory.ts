import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Controls/Adapters';
import { ControlsType } from '@/Engine/Controls/Constants';
import type { TControlsFactory, TControlsParams, TControlsWrapper, TFpsControlsParams, TOrbitControlsParams } from '@/Engine/Controls/Models';
import { FpsControlsWrapper, OrbitControlsWrapper } from '@/Engine/Controls/Wrappers';

function create(params: TControlsParams): TControlsWrapper | never {
  switch (params.type) {
    case ControlsType.FirstPersonControls:
      return FpsControlsWrapper(params as TFpsControlsParams);
    case ControlsType.OrbitControls:
      return OrbitControlsWrapper(params as TOrbitControlsParams);
    default:
      throw new Error(`Unknown controls type: ${params.type}`);
  }
}

export const controlsWithConfigFactory: TReactiveFactory<TControlsWrapper, TControlsParams> = ReactiveFactory(FactoryType.Controls, create);
export const ControlsFactory = (): TControlsFactory => ({ ...controlsWithConfigFactory, configToParams });
