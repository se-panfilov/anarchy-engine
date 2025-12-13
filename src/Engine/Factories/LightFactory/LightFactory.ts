import { ILightWrapper, LightWrapper } from '@Engine/Wrappers';
import type { LightParams } from '@Engine/Models';
import { lightAdapter } from '@Engine/Adapters';
import type { ICreateLightFn, ILightFactory } from '@Engine/Factories';
import { AbstractFactory } from '../AbstractFactory';

const create: ICreateLightFn = (params: LightParams): ILightWrapper => LightWrapper(params);

export const LightFactory = (): ILightFactory => AbstractFactory('light', create, lightAdapter);
