import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryType } from '@Engine/Registries';

import type { ILoopRegistry, ILoopWrapper } from '../Models';

export const LoopRegistry = (): ILoopRegistry => RegistryFacade(AbstractRegistry<ILoopWrapper>(RegistryType.Loop));
