import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryType } from '@Engine/Registries';

import type { ISceneRegistry, ISceneWrapper } from '../Models';

export const SceneRegistry = (): ISceneRegistry => RegistryFacade(AbstractRegistry<ISceneWrapper>(RegistryType.Scene));
