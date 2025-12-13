import { AbstractAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IMaterialAsyncRegistry, IMaterialWrapperAsync } from '@/Engine/Material/Models';

export const MaterialAsyncRegistry = (): IMaterialAsyncRegistry => RegistryFacade(AbstractAsyncRegistry<IMaterialWrapperAsync>(RegistryType.Material));
