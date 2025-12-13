import { RegistryType } from '@/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Abstract/Registries';
import type { TSceneRegistry, TSceneWrapper } from '@/Scene/Models';

export const SceneRegistry = (): TSceneRegistry => {
  return AbstractEntityRegistry<TSceneWrapper>(RegistryType.Scene);
};
