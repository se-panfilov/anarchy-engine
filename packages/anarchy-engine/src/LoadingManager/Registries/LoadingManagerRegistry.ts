import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TLoadingManagerRegistry, TLoadingManagerWrapper } from '@hellpig/anarchy-engine/LoadingManager/Models';

export function LoadingManagerRegistry(): TLoadingManagerRegistry {
  return AbstractEntityRegistry<TLoadingManagerWrapper>(RegistryType.LoadingManager);
}
