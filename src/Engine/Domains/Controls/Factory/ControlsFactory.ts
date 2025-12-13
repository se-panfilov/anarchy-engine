import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Domains/Abstract';

import { getParams } from '../Adapter';
import type { IControlsFactory, IControlsParams, IOrbitControlsWrapper } from '../Models';
import { OrbitControlsWrapper } from '../Wrapper';

export const controlsWithConfigFactory: IReactiveFactory<IOrbitControlsWrapper, IControlsParams> = { ...ReactiveFactory(FactoryType.Controls, OrbitControlsWrapper) };
export const ControlsFactory = (): IControlsFactory => ({ ...controlsWithConfigFactory, getParams });
