import type { IAbstractRegistry } from '@Engine/Models';
import { RegistryFacade, RegistryName } from '@Engine/Registries';
import type { ICameraWrapper } from '@Engine/Wrappers';

import { AbstractRegistry } from '../AbstractRegistry';
import type { ICameraRegistry } from './Models';

export const CameraRegistry = (): ICameraRegistry => {
  const abstractRegistry: IAbstractRegistry<ICameraWrapper> = AbstractRegistry<ICameraWrapper>(RegistryName.Camera);
  return {
    ...RegistryFacade(abstractRegistry)
  };
};
