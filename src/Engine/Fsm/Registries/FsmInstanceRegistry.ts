import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registries';
import type { TFsmInstanceRegistry, TFsmWrapper } from '@/Engine/Fsm/Models';

export function FsmInstanceRegistry(): TFsmInstanceRegistry {
  return AbstractEntityRegistry<TFsmWrapper>(RegistryType.FsmInstance);
}
