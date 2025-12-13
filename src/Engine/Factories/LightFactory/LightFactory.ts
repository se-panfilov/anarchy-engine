import { lightAdapter } from '@Engine/Adapters';
import type { ICreateLightFn, ILightFactory } from '@Engine/Factories';
import type { ILightParams } from '@Engine/Models';
import type { ILightWrapper } from '@Engine/Wrappers';
import { LightWrapper } from '@Engine/Wrappers';

import { AbstractFromConfigFactory } from '../AbstractFactory';

const create: ICreateLightFn = (params: ILightParams): ILightWrapper => LightWrapper(params);
export const LightFactory = (): ILightFactory => AbstractFromConfigFactory('light', create, lightAdapter);
