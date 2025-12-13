import { AbstractRegistry } from '../AbstractRegistry';
import type { ICameraRegistry } from './Models';
import type { ICameraWrapper } from '@Engine/Wrappers';
import type { IAbstractRegistry } from '@Engine/Models';
import { RegistryFacade } from '@Engine/Registries';

export const CameraRegistry = (): ICameraRegistry => {
  const abstractRegistry: IAbstractRegistry<ICameraWrapper> = AbstractRegistry<ICameraWrapper>();
  return {
    ...RegistryFacade(abstractRegistry),
    getByTag(id: string): ICameraWrapper | never {
      if (!abstractRegistry.registry.has(id))
        throw new Error(`Cannot get an entity with id "${id}" from registry ${id}: not exist`);
      return abstractRegistry.registry.get(id) as ICameraWrapper;
    }
  };
};
