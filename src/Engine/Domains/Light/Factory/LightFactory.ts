import type { ICreateLightFn, ILightFactory, ILightParams, ILightWrapper } from '@Engine/Domains/Light/Models';
import { lightAdapter } from '@Engine/Domains/Light/Adapter';
import { LightWrapper } from '@Engine/Domains/Light/Wrapper';
import { AbstractFromConfigWrapperFactory } from '@/Engine/Factories';

const create: ICreateLightFn = (params: ILightParams): ILightWrapper => LightWrapper(params);
export const LightFactory = (): ILightFactory => AbstractFromConfigWrapperFactory('light', create, lightAdapter);
