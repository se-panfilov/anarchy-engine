import { RegistryType } from '@/Abstract/Constants';
import { AbstractSimpleRegistry } from '@/Abstract/Registries';
import type { TFsmSource, TFsmSourceRegistry } from '@/Fsm/Models';

export function FsmSourceRegistry(): TFsmSourceRegistry {
  return AbstractSimpleRegistry<TFsmSource>(RegistryType.FsmSource);
}
