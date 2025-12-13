import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryName } from '@Engine/Registries';

import type { ICameraRegistry, ICameraWrapper } from '../Models';

export const CameraRegistry = (): ICameraRegistry => {
  const abstractRegistry: IAbstractRegistry<ICameraWrapper> = AbstractRegistry<ICameraWrapper>(RegistryName.Camera);
  return {
    ...RegistryFacade(abstractRegistry)
  };
};
