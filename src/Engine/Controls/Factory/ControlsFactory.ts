import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Controls/Adapter';
import type { IControlsFactory, IControlsParams, IControlsWrapper } from '@/Engine/Controls/Models';
import { OrbitControlsWrapper } from '@/Engine/Controls/Wrapper';

export const controlsWithConfigFactory: IReactiveFactory<IControlsWrapper, IControlsParams> = { ...ReactiveFactory(FactoryType.Controls, OrbitControlsWrapper) };
export const ControlsFactory = (): IControlsFactory => ({ ...controlsWithConfigFactory, configToParams });
