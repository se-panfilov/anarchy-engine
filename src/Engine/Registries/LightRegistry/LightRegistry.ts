import { AbstractRegistry } from '../AbstractRegistry';
import type { ILightRegistry } from './Models';
import { RegistryFacade } from '@Engine/Registries';
import type { ILightWrapper } from '@Engine/Wrappers';

export const LightRegistry = (): ILightRegistry => RegistryFacade(AbstractRegistry<ILightWrapper>());
