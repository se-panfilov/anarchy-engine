import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TLoop, TLoopRegistry } from '@/Engine/Loop/Models';

export const LoopRegistry = (): TLoopRegistry => RegistryFacade(AbstractEntityRegistry<TLoop>(RegistryType.Loop));
