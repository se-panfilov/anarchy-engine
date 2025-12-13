import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TFsmRegistry, TFsmWrapper } from '@/Engine/Fsm/Models';

export const FsmRegistry = (): TFsmRegistry => RegistryFacade(AbstractEntityRegistry<TFsmWrapper>(RegistryType.Fsm));
