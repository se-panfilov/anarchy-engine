import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import { AbstractRegistry } from '@Engine/Domains/Abstract';
import type { ICameraRegistry, ICameraWrapper } from '@Engine/Domains/Camera';
import { RegistryFacade, RegistryName } from '@Engine/Registries';

export const CameraRegistry = (): ICameraRegistry => {
  const abstractRegistry: IAbstractRegistry<ICameraWrapper> = AbstractRegistry<ICameraWrapper>(RegistryName.Camera);
  return {
    ...RegistryFacade(abstractRegistry)
  };
};
