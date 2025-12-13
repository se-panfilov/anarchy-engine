import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TFsmInstanceRegistry, TFsmWrapper } from '@Anarchy/Engine/Fsm/Models';

export function FsmInstanceRegistry(): TFsmInstanceRegistry {
  return AbstractEntityRegistry<TFsmWrapper>(RegistryType.FsmInstance);
}
