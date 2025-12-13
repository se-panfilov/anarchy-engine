import { AbstractRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { ICameraRegistry, ICameraWrapper } from '@/Engine/Camera/Models';

export const CameraRegistry = (): ICameraRegistry => RegistryFacade(AbstractRegistry<ICameraWrapper>(RegistryType.Camera));
