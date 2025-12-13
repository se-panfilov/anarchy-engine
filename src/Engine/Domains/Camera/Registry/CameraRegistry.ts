import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { ICameraRegistry, ICameraWrapper } from '@/Engine/Domains/Camera/Models';
import { RegistryType } from '@/Engine/Registries';

export const CameraRegistry = (): ICameraRegistry => RegistryFacade(AbstractRegistry<ICameraWrapper>(RegistryType.Camera));
