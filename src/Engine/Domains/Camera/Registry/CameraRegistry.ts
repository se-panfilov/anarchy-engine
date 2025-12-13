import type { ICameraRegistry, ICameraWrapper } from '@Engine/Domains/Camera/Models';
import type { IAbstractRegistry } from '@Engine/Models';
import { AbstractRegistry, RegistryFacade, RegistryName } from '@Engine/Registries';

export const CameraRegistry = (): ICameraRegistry => {
  const abstractRegistry: IAbstractRegistry<ICameraWrapper> = AbstractRegistry<ICameraWrapper>(RegistryName.Camera);
  return {
    ...RegistryFacade(abstractRegistry)
  };
};
