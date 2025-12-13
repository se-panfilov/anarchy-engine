import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Domains/Abstract';

import { getParams } from '../Adapter';
import type { ILightFactory, ILightParams, ILightWrapper } from '../Models';
import { LightWrapper } from '../Wrapper';

const factory: IReactiveFactory<ILightWrapper, ILightParams> = { ...ReactiveFactory(FactoryType.Light, LightWrapper) };
export const LightFactory = (): ILightFactory => ({ ...factory, getParams });
