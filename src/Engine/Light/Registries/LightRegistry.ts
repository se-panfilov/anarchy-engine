import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registries';
import type { TAbstractLightWrapper, TLight, TLightRegistry } from '@/Engine/Light/Models';

export const LightRegistry = (): TLightRegistry => AbstractEntityRegistry<TAbstractLightWrapper<TLight>>(RegistryType.Light);
