import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Controls/Adapter';
import type { IControlsFactory, IOrbitControlsParams, IOrbitControlsWrapper } from '@/Engine/Controls/Models';
import { OrbitControlsWrapper } from '@/Engine/Controls/Wrapper';

export const controlsWithConfigFactory: IReactiveFactory<IOrbitControlsWrapper, IOrbitControlsParams> = { ...ReactiveFactory(FactoryType.Controls, OrbitControlsWrapper) };
export const ControlsFactory = (): IControlsFactory => ({ ...controlsWithConfigFactory, configToParams });
