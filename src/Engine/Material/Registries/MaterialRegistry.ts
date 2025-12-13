import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TMaterialRegistry, TMaterialWrapper } from '@/Engine/Material/Models';

export const MaterialRegistry = (): TMaterialRegistry => RegistryFacade(AbstractEntityRegistry<TMaterialWrapper>(RegistryType.Material));
