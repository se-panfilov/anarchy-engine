import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { ISceneRegistry, ISceneWrapper } from '@/Engine/Scene/Models';

export const SceneRegistry = (): ISceneRegistry => RegistryFacade(AbstractEntityRegistry<ISceneWrapper>(RegistryType.Scene));
