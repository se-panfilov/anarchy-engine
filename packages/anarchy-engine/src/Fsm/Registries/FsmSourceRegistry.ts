import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractSimpleRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TFsmSource, TFsmSourceRegistry } from '@hellpig/anarchy-engine/Fsm/Models';

export function FsmSourceRegistry(): TFsmSourceRegistry {
  return AbstractSimpleRegistry<TFsmSource>(RegistryType.FsmSource);
}
