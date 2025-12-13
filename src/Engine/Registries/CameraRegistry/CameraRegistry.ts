import type { IAbstractRegistry } from '@Engine/Models';
import { RegistryFacade } from '@Engine/Registries';
import { findKeyByTag, isNotDefined } from '@Engine/Utils';
import type { ICameraWrapper } from '@Engine/Wrappers';

import { AbstractRegistry } from '../AbstractRegistry';
import type { ICameraRegistry } from './Models';

export const CameraRegistry = (): ICameraRegistry => {
  const abstractRegistry: IAbstractRegistry<ICameraWrapper> = AbstractRegistry<ICameraWrapper>();
  return {
    ...RegistryFacade(abstractRegistry),
    getByTag(tag: string): ICameraWrapper | never {
      const id: string | undefined = findKeyByTag(tag, abstractRegistry.registry);
      if (isNotDefined(id)) throw new Error(`Cannot find a camera with tag ${tag}`);
      const camera: ICameraWrapper | undefined = abstractRegistry.registry.get(id);
      if (isNotDefined(camera)) throw new Error(`Cannot find a camera with id ${id}`);
      return camera;
    }
  };
};
