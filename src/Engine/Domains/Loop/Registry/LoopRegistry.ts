import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { ILoopRegistry, ILoopWrapper } from '@/Engine/Domains/Loop/Models';
import { RegistryType } from '@/Engine/Registries';

export const LoopRegistry = (): ILoopRegistry => RegistryFacade(AbstractRegistry<ILoopWrapper>(RegistryType.Loop));
