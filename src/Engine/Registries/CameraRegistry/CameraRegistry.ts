import { AbstractRegistry } from '../AbstractRegistry';
import type { ICameraRegistry } from './Models';
import type { ICameraWrapper } from '@Engine/Wrappers';
import type { IAbstractRegistry } from '@Engine/Models';
import { findKeyByTag, isNotDefined } from '@Engine/Utils';
import { RegistryFacade } from '@Engine/Registries';

export const CameraRegistry = (): ICameraRegistry => {
  const abstractRegistry: IAbstractRegistry<ICameraWrapper> = AbstractRegistry<ICameraWrapper>();
  return {
    ...RegistryFacade(abstractRegistry),
    getByTag(tag: string): ICameraWrapper | never {
      const key: string | undefined = findKeyByTag(tag, abstractRegistry.registry);
      if (isNotDefined(key)) throw new Error(`Cannot find an entity with by tag`);
      return abstractRegistry.registry.get(key) as ICameraWrapper;
    }
  };
};
