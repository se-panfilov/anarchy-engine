import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IAbstractLightWrapper, ILightRegistry } from '@/Engine/Light/Models';

export const LightRegistry = (): ILightRegistry => RegistryFacade(AbstractEntityRegistry<IAbstractLightWrapper>(RegistryType.Light));
