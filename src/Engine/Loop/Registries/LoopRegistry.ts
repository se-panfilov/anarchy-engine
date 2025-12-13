import { AbstractEntityRegistry, RegistryType } from '@/Engine/Abstract';
import type { TLoop, TLoopRegistry } from '@/Engine/Loop/Models';

export const LoopRegistry = (): TLoopRegistry => AbstractEntityRegistry<TLoop>(RegistryType.Loop);
