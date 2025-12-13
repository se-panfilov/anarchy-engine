import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IMaterialRegistry, IMaterialWrapper } from '@/Engine/Material/Models';

export const MaterialRegistry = (): IMaterialRegistry => RegistryFacade(AbstractEntityRegistry<IMaterialWrapper>(RegistryType.Material));
