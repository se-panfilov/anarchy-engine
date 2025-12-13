import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { configToParams } from '@Anarchy/Engine/Controls/Adapters';
import { ControlsType } from '@Anarchy/Engine/Controls/Constants';
import type { TAnyControlsWrapper, TControlsFactory, TControlsParams, TFpsControlsParams, TOrbitControlsParams } from '@Anarchy/Engine/Controls/Models';
import { FpsControlsWrapper, OrbitControlsWrapper } from '@Anarchy/Engine/Controls/Wrappers';

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
  return Object.assign(factory, { configToParams });
}
