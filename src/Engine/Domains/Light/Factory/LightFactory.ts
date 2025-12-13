import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { ReactiveFactory } from '@Engine/Domains/Abstract';

import { getParams } from '../Adapter';
import type { ILightFactory, ILightParams, ILightWrapper } from '../Models';
import { LightWrapper } from '../Wrapper';

const factory: IReactiveFactory<ILightWrapper, ILightParams> = { ...ReactiveFactory('light', LightWrapper) };
export const LightFactory = (): ILightFactory => ({ ...factory, getParams });
