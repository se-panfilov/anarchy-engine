import { AbstractRegistry } from '@Engine/Domains/Abstract';
import type { IControlsRegistry, IControlsWrapper } from '@Engine/Domains/Controls';
import { RegistryFacade, RegistryName } from '@Engine/Registries';

export const ControlsRegistry = (): IControlsRegistry => RegistryFacade(AbstractRegistry<IControlsWrapper>(RegistryName.Controls));
