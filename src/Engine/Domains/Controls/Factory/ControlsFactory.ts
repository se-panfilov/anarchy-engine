import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { ReactiveFactory } from '@Engine/Domains/Abstract';

import { getParams } from '../Adapter';
import type { IControlsFactory, IControlsParams, IOrbitControlsWrapper } from '../Models';
import { OrbitControlsWrapper } from '../Wrapper';

export const controlsWithConfigFactory: IReactiveFactory<IOrbitControlsWrapper, IControlsParams> = { ...ReactiveFactory('controls', OrbitControlsWrapper) };
export const ControlsFactory = (): IControlsFactory => ({ ...controlsWithConfigFactory, getParams });
