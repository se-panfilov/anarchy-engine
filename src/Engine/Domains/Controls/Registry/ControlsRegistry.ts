import type { IControlsRegistry, IControlsWrapper } from '@Engine/Domains/Controls/Models';
import { AbstractRegistry, RegistryFacade, RegistryName } from '@Engine/Registries';

export const ControlsRegistry = (): IControlsRegistry => RegistryFacade(AbstractRegistry<IControlsWrapper>(RegistryName.Controls));
