import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TControlsWrapper, TControlsRegistry } from '@/Engine/Controls/Models';

export const ControlsRegistry = (): TControlsRegistry => RegistryFacade(AbstractEntityRegistry<TControlsWrapper>(RegistryType.Controls));
