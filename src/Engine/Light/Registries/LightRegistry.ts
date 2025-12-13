import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TAbstractLightWrapper, TLight, TLightRegistry } from '@/Engine/Light/Models';

export const LightRegistry = (): TLightRegistry => RegistryFacade(AbstractEntityRegistry<TAbstractLightWrapper<TLight>>(RegistryType.Light));
