import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registry';
import type { IAbstractLightWrapper, ILight, ILightRegistry } from '@/Engine/Light/Models';

export const LightRegistry = (): ILightRegistry => RegistryFacade(AbstractEntityRegistry<IAbstractLightWrapper<ILight>>(RegistryType.Light));
