import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TControlsRegistry, IControlsWrapper } from '@/Engine/Controls/Models';

export const ControlsRegistry = (): TControlsRegistry => RegistryFacade(AbstractEntityRegistry<IControlsWrapper>(RegistryType.Controls));
