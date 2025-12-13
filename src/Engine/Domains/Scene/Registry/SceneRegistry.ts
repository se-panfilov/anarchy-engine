import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { ISceneRegistry, ISceneWrapper } from '@/Engine/Domains/Scene/Models';
import { RegistryType } from '@/Engine/Registries';

export const SceneRegistry = (): ISceneRegistry => RegistryFacade(AbstractRegistry<ISceneWrapper>(RegistryType.Scene));
