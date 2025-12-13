import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Controls/Adapters';
import type { IControlsFactory, IControlsParams, IControlsWrapper, IOrbitControlsParams } from '@/Engine/Controls/Models';
import { OrbitControlsWrapper } from '@/Engine/Controls/Wrappers';

// eslint-disable-next-line functional/prefer-tacit
function create(params: IOrbitControlsParams): IControlsWrapper {
  // TODO (S.Panfilov) Add support for other types of controls
  return OrbitControlsWrapper(params);
}

export const controlsWithConfigFactory: IReactiveFactory<IControlsWrapper, IControlsParams> = { ...ReactiveFactory(FactoryType.Controls, create) };
export const ControlsFactory = (): IControlsFactory => ({ ...controlsWithConfigFactory, configToParams });
