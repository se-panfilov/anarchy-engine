import type { IFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory } from '@Engine/Domains/Abstract';
import { destroyableMixin } from '@Engine/Domains/Mixins';

import { getParams } from '../Adapter';
import type { ILightFactory, ILightParams, ILightWrapper } from '../Models';
import { LightWrapper } from '../Wrapper';

const create = (params: ILightParams): ILightWrapper => LightWrapper(params);
const factory: IFactory<ILightWrapper, ILightParams> = { ...AbstractFactory('light'), create };
export const LightFactory = (): ILightFactory => ({ ...factory, getParams, ...destroyableMixin(factory) });
