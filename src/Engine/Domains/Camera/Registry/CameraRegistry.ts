import { AbstractRegistry, RegistryFacade, RegistryType } from '@/Engine/Domains/Abstract';
import type { ICameraRegistry, ICameraWrapper } from '@/Engine/Domains/Camera/Models';

export const CameraRegistry = (): ICameraRegistry => RegistryFacade(AbstractRegistry<ICameraWrapper>(RegistryType.Camera));
