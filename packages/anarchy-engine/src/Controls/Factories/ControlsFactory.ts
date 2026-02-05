import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { controlsConfigToParams } from '@hellpig/anarchy-engine/Controls/Adapters';
import { ControlsType } from '@hellpig/anarchy-engine/Controls/Constants';
import type { TAnyControlsWrapper, TControlsFactory, TControlsParams, TFpsControlsParams, TOrbitControlsParams } from '@hellpig/anarchy-engine/Controls/Models';
import { FpsControlsWrapper, OrbitControlsWrapper } from '@hellpig/anarchy-engine/Controls/Wrappers';

function create(params: TControlsParams): TAnyControlsWrapper | never {
  switch (params.type) {
    case ControlsType.FirstPersonControls:
      return FpsControlsWrapper(params as TFpsControlsParams);
    case ControlsType.OrbitControls:
      return OrbitControlsWrapper(params as TOrbitControlsParams);
    default:
      throw new Error(`Unknown controls type: ${params.type}`);
  }
}

export function ControlsFactory(): TControlsFactory {
  const factory: TReactiveFactory<TAnyControlsWrapper, TControlsParams> = ReactiveFactory(FactoryType.Controls, create);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: controlsConfigToParams });
}
