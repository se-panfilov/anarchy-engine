import { AbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';

import { lightAdapter } from '../Adapter';
import type { ICreateLightFn, ILightFactory, ILightParams, ILightWrapper } from '../Models';
import { LightWrapper } from '../Wrapper';

const create: ICreateLightFn = (params: ILightParams): ILightWrapper => LightWrapper(params);
export const LightFactory = (): ILightFactory => AbstractFromConfigWrapperFactory('light', create, lightAdapter);
