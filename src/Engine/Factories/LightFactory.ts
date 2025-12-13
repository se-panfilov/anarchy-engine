import { AbstractFactory, CreateFN } from './AbstractFactory';
import { ILightWrapper, LightWrapper } from '@Engine/Wrappers';
import type { Factory, LightParams } from '@Engine/Models';
import { lightAdapter } from '@Engine/Adapters';
import type { AmbientLight, DirectionalLight } from 'three';

const create: CreateFN<ReturnType<typeof LightWrapper>, LightParams> = (
  params: LightParams
): ReturnType<typeof LightWrapper> => LightWrapper(params);

export const LightFactory = (): Factory<ILightWrapper, AmbientLight | DirectionalLight, LightParams> =>
  AbstractFactory('light', create, lightAdapter);
