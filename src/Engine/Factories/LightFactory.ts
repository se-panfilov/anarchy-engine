import { AbstractFactory } from './AbstractFactory';
import { LightWrapper } from '@Engine/Wrappers';
import type { Factory, LightParams } from '@Engine/Models';

const create = (params: LightParams): ReturnType<typeof LightWrapper> => LightWrapper(params);

export const LightFactory = (): Factory<ReturnType<typeof LightWrapper>, LightParams> => AbstractFactory(create);
