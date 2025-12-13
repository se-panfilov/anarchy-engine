import { AbstractRegistry, RegistryFacade, RegistryName } from '@Engine/Registries';
import type { IControlsRegistry, IControlsWrapper } from '@Engine/Domains/Controls/Models';

export const ControlsRegistry = (): IControlsRegistry => RegistryFacade(AbstractRegistry<IControlsWrapper>(RegistryName.Controls));
