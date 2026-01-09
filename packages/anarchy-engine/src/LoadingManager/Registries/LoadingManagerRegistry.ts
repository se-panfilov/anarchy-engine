import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TLoadingManagerRegistry, TLoadingManagerWrapper } from '@Anarchy/Engine/LoadingManager/Models';

export function LoadingManagerRegistry(): TLoadingManagerRegistry {
  return AbstractEntityRegistry<TLoadingManagerWrapper>(RegistryType.LoadingManager);
}
