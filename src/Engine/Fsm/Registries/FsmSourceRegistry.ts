import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractSimpleRegistry } from '@/Engine/Abstract/Registries';
import type { TFsmSource, TFsmSourceRegistry } from '@/Engine/Fsm/Models';

export const FsmSourceRegistry = (): TFsmSourceRegistry => AbstractSimpleRegistry<TFsmSource>(RegistryType.FsmSource);
