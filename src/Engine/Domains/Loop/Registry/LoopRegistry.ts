import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryName } from '@Engine/Registries';

import type { ILoopRegistry, ILoopWrapper } from '../Models';

export const LoopRegistry = (): ILoopRegistry => RegistryFacade(AbstractRegistry<ILoopWrapper>(RegistryName.Loop));
