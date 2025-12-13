import type { TReactiveFactory } from '@/Abstract';
import { FactoryType, ReactiveFactory } from '@/Abstract';
import { configToParams } from '@/Controls/Adapters';
import { ControlsType } from '@/Controls/Constants';
import type { TAnyControlsWrapper, TControlsFactory, TControlsParams, TFpsControlsParams, TOrbitControlsParams } from '@/Controls/Models';
import { FpsControlsWrapper, OrbitControlsWrapper } from '@/Controls/Wrappers';

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
