import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractSimpleRegistry } from '@/Engine/Abstract/Registries';
import type { TFsmSource, TFsmSourceRegistry } from '@/Engine/Fsm/Models';

export function FsmSourceRegistry(): TFsmSourceRegistry {
  return AbstractSimpleRegistry<TFsmSource>(RegistryType.FsmSource);
}
