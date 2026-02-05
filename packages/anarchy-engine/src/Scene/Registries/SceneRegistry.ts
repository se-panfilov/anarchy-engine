import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TSceneRegistry, TSceneWrapper } from '@hellpig/anarchy-engine/Scene/Models';

export const SceneRegistry = (): TSceneRegistry => {
  return AbstractEntityRegistry<TSceneWrapper>(RegistryType.Scene);
};
