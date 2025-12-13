import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractSimpleRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TFsmSource, TFsmSourceRegistry } from '@/Engine/Fsm/Models';

export const FsmSourceRegistry = (): TFsmSourceRegistry => RegistryFacade(AbstractSimpleRegistry<TFsmSource>(RegistryType.FsmSource));
