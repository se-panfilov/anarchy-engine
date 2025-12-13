import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { ISceneRegistry, ISceneWrapper } from '@/Engine/Scene/Models';

export const SceneRegistry = (): ISceneRegistry => RegistryFacade(AbstractEntityRegistry<ISceneWrapper>(RegistryType.Scene));
