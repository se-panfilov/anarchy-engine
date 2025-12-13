import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TFsmInstanceRegistry, TFsmWrapper } from '@/Engine/Fsm/Models';

export const FsmInstanceRegistry = (): TFsmInstanceRegistry => RegistryFacade(AbstractEntityRegistry<TFsmWrapper>(RegistryType.FsmInstance));
