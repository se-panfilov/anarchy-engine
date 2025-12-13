import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryName } from '@Engine/Registries';

import type { ISceneRegistry, ISceneWrapper } from '../Models';

export const SceneRegistry = (): ISceneRegistry => RegistryFacade(AbstractRegistry<ISceneWrapper>(RegistryName.Scene));
