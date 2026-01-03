import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TLoadingManagerRegistry, TLoadingManagerWrapper } from '@Anarchy/Engine/Loading/Models';

export function LoadingManagerRegistry(): TLoadingManagerRegistry {
  return AbstractEntityRegistry<TLoadingManagerWrapper>(RegistryType.LoadingManager);
}
