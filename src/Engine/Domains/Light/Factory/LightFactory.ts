import { AbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';
import type { ICreateLightFn, ILightFactory, ILightParams, ILightWrapper } from '@Engine/Domains/Light';
import { lightAdapter, LightWrapper } from '@Engine/Domains/Light';

const create: ICreateLightFn = (params: ILightParams): ILightWrapper => LightWrapper(params);
export const LightFactory = (): ILightFactory => AbstractFromConfigWrapperFactory('light', create, lightAdapter);
