import { LightWrapper } from '@Engine/Wrappers/LightWrapper';
import { AbstractFactory } from '@Engine/Factories/AbstractFactory';
import type { LightParams } from '@Engine/Models/LightParams';
import type { Factory } from '@Engine/Models/Factory';

const create = (params: LightParams): ReturnType<typeof LightWrapper> => LightWrapper(params);

export const LightFactory = (): Factory<ReturnType<typeof LightWrapper>, LightParams> => AbstractFactory(create);
