import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registries';
import type { TSceneRegistry, TSceneWrapper } from '@/Engine/Scene/Models';

export const SceneRegistry = (): TSceneRegistry => AbstractEntityRegistry<TSceneWrapper>(RegistryType.Scene);
