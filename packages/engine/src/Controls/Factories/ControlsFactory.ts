import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Controls/Adapters';
import { ControlsType } from '@/Engine/Controls/Constants';
import type { TAnyControlsWrapper, TControlsFactory, TControlsParams, TFpsControlsParams, TOrbitControlsParams } from '@/Engine/Controls/Models';
import { FpsControlsWrapper, OrbitControlsWrapper } from '@/Engine/Controls/Wrappers';

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
