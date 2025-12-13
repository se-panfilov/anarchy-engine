import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IAbstractLightWrapper, ILight, ILightRegistry } from '@/Engine/Light/Models';

export const LightRegistry = (): ILightRegistry => RegistryFacade(AbstractEntityRegistry<IAbstractLightWrapper<ILight>>(RegistryType.Light));
