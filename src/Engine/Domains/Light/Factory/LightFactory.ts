import type { IFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory, destroyableFactoryMixin, withConfigMixin } from '@Engine/Domains/Abstract';

import { fromConfig } from '../Adapter';
import type { ILightFactory, ILightParams, ILightWrapper } from '../Models';
import { LightWrapper } from '../Wrapper';

const create = (params: ILightParams): ILightWrapper => LightWrapper(params);
const factory: IFactory<ILightWrapper, ILightParams> = { ...AbstractFactory('light'), create };
export const LightFactory = (): ILightFactory => ({ ...factory, ...withConfigMixin(fromConfig), ...destroyableFactoryMixin(factory) });
