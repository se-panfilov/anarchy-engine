import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TSceneRegistry, TSceneWrapper } from '@Anarchy/Engine/Scene/Models';

export const SceneRegistry = (): TSceneRegistry => {
  return AbstractEntityRegistry<TSceneWrapper>(RegistryType.Scene);
};
