import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TFsmInstanceRegistry, TFsmWrapper } from '@hellpig/anarchy-engine/Fsm/Models';

export function FsmInstanceRegistry(): TFsmInstanceRegistry {
  return AbstractEntityRegistry<TFsmWrapper>(RegistryType.FsmInstance);
}
