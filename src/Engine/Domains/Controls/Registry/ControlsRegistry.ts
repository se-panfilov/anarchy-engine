import { AbstractRegistry, RegistryFacade, RegistryType } from '@/Engine/Domains/Abstract';
import type { IControlsRegistry, IOrbitControlsWrapper } from '@/Engine/Domains/Controls/Models';

export const ControlsRegistry = (): IControlsRegistry => RegistryFacade(AbstractRegistry<IOrbitControlsWrapper>(RegistryType.Controls));
