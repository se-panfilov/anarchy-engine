import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractSimpleRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TFsmSource, TFsmSourceRegistry } from '@Anarchy/Engine/Fsm/Models';

export function FsmSourceRegistry(): TFsmSourceRegistry {
  return AbstractSimpleRegistry<TFsmSource>(RegistryType.FsmSource);
}
