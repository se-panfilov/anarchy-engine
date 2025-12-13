import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { ILightRegistry, ILightWrapper } from '@/Engine/Light/Models';

export const LightRegistry = (): ILightRegistry => RegistryFacade(AbstractEntityRegistry<ILightWrapper>(RegistryType.Light));
