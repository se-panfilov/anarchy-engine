import { RegistryType } from '@/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Abstract/Registries';
import type { TFsmInstanceRegistry, TFsmWrapper } from '@/Fsm/Models';

export function FsmInstanceRegistry(): TFsmInstanceRegistry {
  return AbstractEntityRegistry<TFsmWrapper>(RegistryType.FsmInstance);
}
