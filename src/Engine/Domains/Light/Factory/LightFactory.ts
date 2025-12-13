import { lightAdapter, LightWrapper } from '@Engine/Domains/Light';
import type { ICreateLightFn, ILightFactory, ILightParams, ILightWrapper } from '@Engine/Domains/Light';

import { AbstractFromConfigWrapperFactory } from '@/Engine/Domains/Abstract';

const create: ICreateLightFn = (params: ILightParams): ILightWrapper => LightWrapper(params);
export const LightFactory = (): ILightFactory => AbstractFromConfigWrapperFactory('light', create, lightAdapter);
