import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Domains/Abstract';

import { getParams } from '@/Engine/Domains/Controls/Adapter';
import type { IControlsFactory, IControlsParams, IOrbitControlsWrapper } from '@/Engine/Domains/Controls/Models';
import { OrbitControlsWrapper } from '@/Engine/Domains/Controls/Wrapper';

export const controlsWithConfigFactory: IReactiveFactory<IOrbitControlsWrapper, IControlsParams> = { ...ReactiveFactory(FactoryType.Controls, OrbitControlsWrapper) };
export const ControlsFactory = (): IControlsFactory => ({ ...controlsWithConfigFactory, getParams });
