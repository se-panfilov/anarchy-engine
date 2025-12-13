import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TModels3dRegistry, TModels3dWrapper } from '@/Engine/Models3d/Models';

export const Models3dRegistry = (): TModels3dRegistry => RegistryFacade(AbstractEntityRegistry<TModels3dWrapper>(RegistryType.Models3d));
