import { AbstractRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { ISceneRegistry, ISceneWrapper } from '@/Engine/Scene/Models';

export const SceneRegistry = (): ISceneRegistry => RegistryFacade(AbstractRegistry<ISceneWrapper>(RegistryType.Scene));
