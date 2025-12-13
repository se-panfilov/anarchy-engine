import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { ReactiveFactory } from '@Engine/Domains/Abstract';

import { getParams } from '../Adapter';
import type { IControlsFactory, IControlsParams, IControlsWrapper } from '../Models';
import { ControlsWrapper } from '../Wrapper';

export const controlsWithConfigFactory: IReactiveFactory<IControlsWrapper, IControlsParams> = { ...ReactiveFactory('controls', ControlsWrapper) };
export const ControlsFactory = (): IControlsFactory => ({ ...controlsWithConfigFactory, getParams });
